import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../explorer.css'

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

    return (
        <div className='background'>
            <div className="explorerContainer" ref={containerRef}>
                <div className="title-bar">
                    <h3>Sobre Mí</h3>
                    <button onClick={close}>X</button>
                </div>
                <div className="content">asddad</div>
            </div>
        </div>
    );
}
