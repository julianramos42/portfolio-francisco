import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

function ThreeScene({ functions, isSelected, isLoaded }) {
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const [finalCamera, setFinalCamera] = useState('');

    useEffect(() => {
        const renderer = rendererRef.current || new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = -1;
        if (!rendererRef.current) {
            document.body.appendChild(renderer.domElement);
            rendererRef.current = renderer;
        }

        const camera = cameraRef.current || new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        if (!cameraRef.current) {
            camera.position.set(0, 2, 5);
            cameraRef.current = camera;
        }

        let mixer;

        const scene = sceneRef.current || new THREE.Scene();
        if (!sceneRef.current) {
            sceneRef.current = scene;
        }

        const loader = new GLTFLoader();

        const basePath = '/assets/portfolio/';
        loader.setPath(basePath);

        let modelCamera;

        const addModelToScene = (gltf, name) => {
            if (!scene.getObjectByName(name)) {
                const model = gltf.scene;
                model.name = name;
                scene.add(model);

                if (name === 'sceneModel') {
                    model.children[16].material = createVideoTexture("contacto");
                    model.children[17].material = createVideoTexture("experiencia");
                    model.children[18].material = createVideoTexture("sobre_mi");
                    model.children[19].material = createVideoTexture("franramos");

                    modelCamera = gltf.cameras[0];
                    animateTransition();
                }

                if (name === 'humanModel') {
                    mixer = new THREE.AnimationMixer(model.children[0]);
                    const clip = gltf.animations[0];
                    const action = mixer.clipAction(clip, model.children[0]);
                    action.play();
                }
            }
        };

        loader.load('scene.gltf', (gltf) => addModelToScene(gltf, 'sceneModel'), null, (error) => console.error('Error al cargar el modelo glTF', error));
        loader.load('human.glb', (gltf) => addModelToScene(gltf, 'humanModel'), null, (error) => console.error('Error al cargar el modelo glTF', error));

        function animateTransition() {
            if (isLoaded) {
                cameraRef.current = finalCamera;
            } else {
                if (modelCamera) {
                    const targetCamera = modelCamera;
                    const smoothFactor = 0.2;
                    const intermediatePosition = new THREE.Vector3().lerpVectors(camera.position, targetCamera.position, smoothFactor);

                    gsap.to(camera.position, {
                        duration: 3,
                        x: intermediatePosition.x + 0.5,
                        y: intermediatePosition.y + 0.5,
                        z: targetCamera.position.z,
                        onUpdate: () => camera.lookAt(new THREE.Vector3(0, 0, 0))
                    });

                    gsap.to(camera.rotation, {
                        duration: 3,
                        x: targetCamera.rotation.x,
                        y: targetCamera.rotation.y - 0.05,
                        z: targetCamera.rotation.z,
                        onComplete: () => setFinalCamera(camera)
                    });

                    functions.loaded();
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);

            if (mixer) {
                mixer.update(0.01);
            }
            if (cameraRef.current) {
                renderer.render(scene, cameraRef.current);
            }
        }

        animate();

        return () => document.body.style.cursor = 'default';
    }, [isLoaded, functions]);

    useEffect(() => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event) => {
            if (!isSelected) {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, cameraRef.current);
                const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

                if (intersects.length > 0) {
                    switch (intersects[0].object.name) {
                        case 'monitorIzquierda':
                            functions.sobreMi();
                            functions.selected();
                            break;
                        case 'monitorDerecha':
                            functions.experiencia();
                            functions.selected();
                            break;
                        case 'monitorArriba':
                            functions.contacto();
                            functions.selected();
                            break;
                        default:
                            break;
                    }
                }
            }
        };

        const onMouseMove = (event) => {
            if (!isSelected) {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, cameraRef.current);
                const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

                if (intersects.length > 0) {
                    switch (intersects[0].object.name) {
                        case 'monitorIzquierda':
                        case 'monitorDerecha':
                        case 'monitorArriba':
                            document.body.style.cursor = 'pointer';
                            break;
                        default:
                            document.body.style.cursor = 'default';
                            break;
                    }
                }
            }
        };

        if (!isSelected) {
            window.addEventListener('click', onMouseClick);
            window.addEventListener('mousemove', onMouseMove);
        } else {
            window.removeEventListener('click', onMouseClick);
            window.removeEventListener('mousemove', onMouseMove);
        }

        return () => {
            window.removeEventListener('click', onMouseClick);
            window.removeEventListener('mousemove', onMouseMove);
            document.body.style.cursor = 'default';
        };
    }, [isSelected, functions]);

    const createVideoTexture = useCallback((videoId) => {
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
    }, []);

    return null;
}

export default ThreeScene;
