import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { WebGL } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';

function ThreeScene() {
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = -1
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        // Ejemplo de creación de una cámara perspectiva
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 5);
        let mixer;

        const scene = new THREE.Scene();

        const createVideoTexture = (videoId) => {
            let video = document.getElementById(videoId);
            let texture = new THREE.VideoTexture(video);
            texture.flipY = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat;
            return new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide,
                toneMapped: false
            });
        };

        let contactoMaterial = createVideoTexture("contacto");
        let experienciaMaterial = createVideoTexture("experiencia");
        let franMaterial = createVideoTexture("franramos");
        let sobreMiMaterial = createVideoTexture("sobre_mi");

        const loader = new GLTFLoader();

        const basePath = '/assets/portfolio/';
        loader.setPath(basePath);

        let modelCamera;
        // Cargar el setup
        loader.load('scene.gltf',
            function (gltf) {
                // Añadir el modelo a la escena
                const model = gltf.scene;
                scene.add(model);

                //agregar los videos al material del objeto
                model.children[16].material = contactoMaterial;
                model.children[17].material = experienciaMaterial;
                model.children[18].material = sobreMiMaterial;
                model.children[19].material = franMaterial;

                // Configurar la cámara
                modelCamera = gltf.cameras[0];
                // Ejemplo de cómo animar la transición de la cámara
                function animateTransition() {
                    if (modelCamera) {
                        const targetCamera = modelCamera;
                
                        // Calcula una posición intermedia más suave entre la posición actual de la cámara y la posición de destino
                        const smoothFactor = 0.2; // Factor de interpolación más bajo para una transición más suave
                        const intermediatePosition = new THREE.Vector3().lerpVectors(camera.position, targetCamera.position, smoothFactor);
                
                        // Configura la animación usando GSAP
                        gsap.to(camera.position, {
                            duration: 3, // Duración de la animación en segundos
                            x: intermediatePosition.x+0.5,
                            y: intermediatePosition.y+0.5,
                            z: targetCamera.position.z,
                            onUpdate: function () {
                                // Este callback se llama en cada frame de la animación
                                camera.lookAt(new THREE.Vector3(0, 0, 0)); // Asegúrate de que la cámara siempre mire al centro
                            }
                        });
                
                        gsap.to(camera.rotation, {
                            duration: 3,
                            x: targetCamera.rotation.x,
                            y: targetCamera.rotation.y-0.05,
                            z: targetCamera.rotation.z
                        });
                    }
                }
                animateTransition();
            },
            null,
            function (error) {
                console.error('Error al cargar el modelo glTF', error);
            }
        );

        // Cargar y animar el personaje
        loader.load('human.glb',
            function (gltf) {
                // Añadir el modelo a la escena
                const model = gltf.scene;
                scene.add(model);
                //  Crear el mixer y asociar la primera animación al primer hijo del modelo
                mixer = new THREE.AnimationMixer(model.children[0]);
                const clip = gltf.animations[0]; // Selecciona la primera animación
                const action = mixer.clipAction(clip, model.children[0]); // Asigna la animación al primer hijo
                action.play();
            },
            null,
            function (error) {
                console.error('Error al cargar el modelo glTF', error);
            }
        );

        // Configurar el raycaster y el vector del ratón
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseClick(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);
            // interseccion del mouse con el objeto
            if (intersects.length > 0) {
                switch (intersects[0].object.name) {
                    case 'monitorIzquierda':
                        console.log("izquierda")

                        break;
                    case 'monitorDerecha':
                        console.log("derecha")
                        break;
                    case 'monitorArriba':
                        console.log("arriba")
                        break;
                    default:
                        break;
                }
            }
        }
        window.addEventListener('click', onMouseClick, false);

        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                switch (intersects[0].object.name) {
                    case 'monitorIzquierda':
                        document.body.style.cursor = 'pointer';
                        break;
                    case 'monitorDerecha':
                        document.body.style.cursor = 'pointer';
                        break;
                    case 'monitorArriba':
                        document.body.style.cursor = 'pointer';
                        break;
                    default:
                        document.body.style.cursor = 'default';
                        break;
                }
            }
        }
        window.addEventListener('mousemove', onMouseMove, false);

        // Función principal para animar
        function animate() {
            requestAnimationFrame(animate);

            if (mixer) {
                mixer.update(0.01)
            };
            contactoMaterial.map.needsUpdate = true;
            experienciaMaterial.map.needsUpdate = true;
            franMaterial.map.needsUpdate = true;
            sobreMiMaterial.map.needsUpdate = true;
            if (camera) {
                renderer.render(scene, camera);
            }
        }

        if (WebGL.isWebGLAvailable()) {
            animate();
        } else {
            const warning = WebGL.getWebGLErrorMessage();
            document.getElementById('container').appendChild(warning);
        }

    }, []);

    return null;
}

export default ThreeScene;
