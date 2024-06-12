import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

function ThreeScene({ functions, isSelected, isLoaded }) {
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const [finalCamera, setFinalCamera] = useState('');
    const [cantModelsLoaded, setCantModelsLoaded] = useState(0)

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
            camera.position.set(2, 3, 5);
            cameraRef.current = camera;
        }

        let humanMixer, mouseMixer;

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
                    model.children[9].material = createVideoTexture("contacto");
                    model.children[10].material = createVideoTexture("franramos");
                    model.children[11].material = createVideoTexture("experiencia");
                    model.children[12].material = createVideoTexture("sobre_mi");

                    modelCamera = gltf.cameras[0];
                    animateTransition();
                    mouseMixer = new THREE.AnimationMixer(model.children[8]);
                    const clip = gltf.animations[0];
                    const action = mouseMixer.clipAction(clip, model.children[8]);
                    action.play();
                }

                if (name === 'humanModel') {
                    humanMixer = new THREE.AnimationMixer(model.children[0]);
                    const clip = gltf.animations[0];
                    const action = humanMixer.clipAction(clip, model.children[0]);
                    action.play();
                }
                setCantModelsLoaded(cantModelsLoaded + 1)
            }
        };

        loader.load('human.glb', (gltf) => addModelToScene(gltf, 'humanModel'), null, (error) => console.error('Error al cargar el modelo glTF', error));
        if (cantModelsLoaded !== 0) {
            loader.load('scene.gltf', (gltf) => addModelToScene(gltf, 'sceneModel'), null, (error) => console.error('Error al cargar el modelo glTF', error));
        }

        function animateTransition() {
            if (isLoaded) {
                cameraRef.current = finalCamera;
            } else {
                if (modelCamera) {
                    const targetCamera = modelCamera;
                    const smoothFactor = 0.2;
                    const intermediatePosition = new THREE.Vector3().lerpVectors(camera.position, targetCamera.position, smoothFactor);

                    if (window.innerWidth < 600) {
                        gsap.to(camera.position, {
                            duration: 3,
                            x: intermediatePosition.x + 3.2,
                            y: intermediatePosition.y + 1,
                            z: targetCamera.position.z,
                            onUpdate: () => camera.lookAt(new THREE.Vector3(0, 0, 0))
                        });
                    } else {
                        gsap.to(camera.position, {
                            duration: 3,
                            x: intermediatePosition.x + 1,
                            y: intermediatePosition.y + 0.5,
                            z: targetCamera.position.z,
                            onUpdate: () => camera.lookAt(new THREE.Vector3(0, 0, 0))
                        });
                    }

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

            if (humanMixer) {
                humanMixer.update(0.005);
            }
            if (mouseMixer) {
                mouseMixer.update(0.005);
            }
            if (cameraRef.current) {
                renderer.render(scene, cameraRef.current);
            }
        }

        animate();

        const handleResize = () => {
            const camera = cameraRef.current;
            const renderer = rendererRef.current;
            if (camera && renderer) {
                const aspect = window.innerWidth / window.innerHeight;
                camera.aspect = aspect;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            document.body.style.cursor = 'default';
            window.removeEventListener('resize', handleResize);
        };
    }, [isLoaded, functions, cantModelsLoaded]);

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
                        case 'sobre_mi':
                            functions.sobreMi();
                            functions.selected();
                            break;
                        case 'experiencia':
                            functions.experiencia();
                            functions.selected();
                            break;
                        case 'contacto':
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
                        case 'sobre_mi':
                        case 'experiencia':
                        case 'contacto':
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

    return (
        <>
            {
                cantModelsLoaded < 2 ? <div className='loaderContainer'><div className='loader'></div><p>Cargando el modelo 3D</p></div> : null
            }
        </>
    )
}

export default ThreeScene;
