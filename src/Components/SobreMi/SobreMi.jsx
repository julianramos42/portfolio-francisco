import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../explorer.css'
import './sobreMi.css'
import avatar from '../../images/avatar.png'
import sobreMi1 from '../../images/sobreMi/sobreMi2022-1.jpg'
import sobreMi2 from '../../images/sobreMi/sobreMi2022-2.jpg'
import sobreMi3 from '../../images/sobreMi/sobreMi2023-1.jpg'
import sobreMi4 from '../../images/sobreMi/sobreMi2023-2.jpg'
import sobreMi5 from '../../images/sobreMi/sobreMi2023-3.jpg'
import sobreMi6 from '../../images/sobreMi/sobreMi2024-1.jpg'

export default function SobreMi({ renderSobreMi, renderSelected }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const element = containerRef.current;

        // Define the starting position of the animation (e.g., from the monitor position)
        gsap.fromTo(element,
            {
                opacity: 0,
                x: "0px",
                y: "0px",
                scale: 0.1
            },
            {
                opacity: 1,
                x: "0",
                y: "0",
                scale: 1,
                duration: 0.3,
                ease: "power2.in"
            }
        );

        const handleKeyPress = (event) => {
            if (event.keyCode === 27) { // 27 es escape
                close();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };

    }, []);

    function close() {
        const element = containerRef.current;
        gsap.to(element, {
            opacity: 0,
            x: "45vw",
            y: "-50vh",
            scale: 0.1,
            duration: 0.25,
            ease: "power2.out",
            onComplete: () => {
                renderSelected();
                renderSobreMi();
            }
        });
    }

    const descriptions = [
        {
            age: 2022,
            text: ["Empecé a aprender el paquete Adobe, incluyendo Premiere Pro, After Effects y Photoshop.", "Inicié la creación de contenido en TikTok sobre videojuegos, logrando alcanzar 5 millones de visitas."],
            images: [
                {
                    href: '',
                    src: sobreMi1
                },
                {
                    href: '',
                    src: sobreMi2
                }
            ]
        },
        {
            age: 2023,
            text: ["Perfeccioné mis habilidades de edición de video e imágenes.", "Empecé a subir mis ediciones a TikTok, alcanzando más de 10 millones de visitas."],
            images: [
                {
                    href: 'https://www.tiktok.com/@franrammos/video/7154594473685683462',
                    src: sobreMi3
                },
                {
                    href: 'https://www.tiktok.com/@franrammos/video/7154955420434484485',
                    src: sobreMi4
                },
                {
                    href: 'https://www.tiktok.com/@franrammos/video/7152975499013213445',
                    src: sobreMi5
                }
            ]
        },
        {
            age: 2024,
            text: ["Inicié mi marca personal en Instagram y TikTok.", "Más de 500 videos editados.", "Más de 50 miniaturas realizadas.", "Colaboré exitosamente con más de 20 clientes."],
            images: [
                {
                    href: '',
                    src: sobreMi6
                },
            ]
        }
    ]

    return (
        <div className='background'>
            <div className="explorerContainer" ref={containerRef}>
                <div className="title-bar">
                    <h3>Sobre Mí</h3>
                    <button onClick={close}>X</button>
                </div>
                <div className="content">
                    <div className='avatarBlock'>
                        <section>
                            <h2>Francisco Ramos</h2>
                            <p>Editor Audiovisual</p>
                        </section>
                        <img src={avatar} alt='avatar'></img>
                    </div>
                    {
                        descriptions &&
                        descriptions.map((description, i) => (
                            <section key={i} className='block'>
                                <div className='description'>
                                    <h5>{description.age}</h5>
                                    <ul>
                                        {
                                            description.text.map((text, i) => (
                                                <li key={i}>{text}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className='tiktokContainer'>
                                    {
                                        description.images.map((image, i) => (
                                            <div className='tiktokCard'>
                                                <img key={i} src={image.src} alt='tiktok' className='tiktok'></img>
                                                {
                                                    image.href && <a href={image.href} target='_blank'>Ir al tiktok</a>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </section>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
