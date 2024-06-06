import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../explorer.css'
import './sobreMi.css'
import avatar from '../../images/avatar.png'
import prueba from '../../images/1.png'

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
            });
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
            text: ["Empecé a aprender el paquete Adobe, incluyendo Premiere Pro, After Effects y Photoshop.","Inicié la creación de contenido en TikTok sobre videojuegos, logrando alcanzar 5 millones de visitas."],       
            images: [prueba, prueba, prueba, prueba]
        },
        {
            age: 2023,
            text: ["Perfeccioné mis habilidades de edición de video e imágenes.","Empecé a subir mis ediciones a TikTok, alcanzando más de 10 millones de visitas."],       
            images: [prueba, prueba, prueba, prueba]
        },
        {
            age: 2024,
            text: ["Inicié mi marca personal en Instagram y TikTok.","Más de 500 videos editados.","Más de 50 miniaturas realizadas.","Colaboré exitosamente con más de 20 clientes."],       
            images: [prueba, prueba, prueba, prueba]
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
                                                <img key={i} src={image} alt='tiktok' className='tiktok'></img>
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
