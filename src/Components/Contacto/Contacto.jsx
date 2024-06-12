import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../explorer.css'
import './contacto.css'

export default function Contacto({ renderContacto, renderSelected }) {
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
                renderSelected()
                renderContacto()
            }
        });
    }

    const data = [
        {
            icon: "fa-regular fa-envelope",
            type: "Email:",
            href: "mailto:ramosbusiness56@gmail.com",
            text: "ramosbusiness56@gmail.com"
        },
        {
            icon: "fa-brands fa-linkedin-in",
            type: "LinkedIn:",
            href: "https://www.linkedin.com/in/franrammos/",
            text: "Francisco Ramos"
        },
        {
            icon: "fa-brands fa-instagram",
            type: "Instagram:",
            href: "https://www.instagram.com/franrammos_/",
            text: "@franrammos_"
        }
    ]

    return (
        <div className='background'>
            <div className="explorerContainer" ref={containerRef}>
                <div className="title-bar">
                    <h3>Contacto</h3>
                    <button onClick={close}>X</button>
                </div>
                <div className="content">
                    <div className='links'>
                        {
                            data &&
                            data.map((contactData, i) => (
                                <div className='link' key={i}>
                                    <>
                                        <i className={contactData.icon}></i>
                                        <p>{contactData.type}</p>
                                    </>
                                    <a href={contactData.href} target='_blank' rel='noreferrer'>{contactData.text}</a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
