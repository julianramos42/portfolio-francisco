import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../explorer.css'
import './experiencia.css'
import norteVerdeVideo from '../../videos/Norte_Verde_Trabajos.mp4'
import pabloFernandezVideo from '../../videos/Pablo_Fernández_Trabajos.mp4'
import pabloFernandezFoto from '../../images/clientes/Pablo.png'
import norteVerdeFoto from '../../images/clientes/Norte_Verde.png'
import santiMalanoFoto from '../../images/clientes/Santi_Malano.png'
import saltenoFoto from '../../images/clientes/salteno.png'
import variosFoto from '../../images/clientes/varios.png'
//norteVerde
import norteVerde1 from '../../videos/reels/Norte_Verde/nv1.mp4'
import norteVerde2 from '../../videos/reels/Norte_Verde/nv2.mp4'
import norteVerde3 from '../../videos/reels/Norte_Verde/nv3.mp4'
import norteVerde4 from '../../videos/reels/Norte_Verde/nv4.mp4'
import norteVerde5 from '../../videos/reels/Norte_Verde/nv5.mp4'
import norteVerde6 from '../../videos/reels/Norte_Verde/nv6.mp4'
import norteVerde7 from '../../videos/reels/Norte_Verde/nv7.mp4'
import norteVerde8 from '../../videos/reels/Norte_Verde/nv8.mp4'
import norteVerde9 from '../../videos/reels/Norte_Verde/nv9.mp4'
//pabloFernandez
import pabloFernandez1 from '../../videos/reels/Pablo_fernandez/pf1.mp4'
import pabloFernandez2 from '../../videos/reels/Pablo_fernandez/pf2.mp4'
import pabloFernandez3 from '../../videos/reels/Pablo_fernandez/pf3.mp4'
import pabloFernandez4 from '../../videos/reels/Pablo_fernandez/pf4.mp4'
import pabloFernandez5 from '../../videos/reels/Pablo_fernandez/pf5.mp4'
import pabloFernandez6 from '../../videos/reels/Pablo_fernandez/pf6.mp4'
import pabloFernandez7 from '../../videos/reels/Pablo_fernandez/pf7.mp4'
import pabloFernandez8 from '../../videos/reels/Pablo_fernandez/pf8.mp4'
import pabloFernandez9 from '../../videos/reels/Pablo_fernandez/pf9.mp4'
import pabloFernandez10 from '../../videos/reels/Pablo_fernandez/pf10.mp4'
import pabloFernandez11 from '../../videos/reels/Pablo_fernandez/pf11.mp4'
//santiMalano
import santiMalano1 from '../../videos/reels/Santi_Malano/sm1.mp4'
import santiMalano2 from '../../videos/reels/Santi_Malano/sm2.mp4'
import santiMalano3 from '../../videos/reels/Santi_Malano/sm3.mp4'
import santiMalano4 from '../../videos/reels/Santi_Malano/sm4.mp4'
import santiMalano5 from '../../videos/reels/Santi_Malano/sm5.mp4'
import santiMalano6 from '../../videos/reels/Santi_Malano/sm6.mp4'
import santiMalano7 from '../../videos/reels/Santi_Malano/sm7.mp4'
import santiMalano8 from '../../videos/reels/Santi_Malano/sm8.mp4'
import santiMalano9 from '../../videos/reels/Santi_Malano/sm9.mp4'
import santiMalano10 from '../../videos/reels/Santi_Malano/sm10.mp4'
import santiMalano11 from '../../videos/reels/Santi_Malano/sm11.mp4'
import santiMalano12 from '../../videos/reels/Santi_Malano/sm12.mp4'
import santiMalano13 from '../../videos/reels/Santi_Malano/sm13.mp4'
import santiMalano14 from '../../videos/reels/Santi_Malano/sm14.mp4'
import santiMalano15 from '../../videos/reels/Santi_Malano/sm15.mp4'
import santiMalano16 from '../../videos/reels/Santi_Malano/sm16.mp4'
import santiMalano17 from '../../videos/reels/Santi_Malano/sm17.mp4'
import santiMalano18 from '../../videos/reels/Santi_Malano/sm18.mp4'
import santiMalano19 from '../../videos/reels/Santi_Malano/sm19.mp4'
import santiMalano20 from '../../videos/reels/Santi_Malano/sm20.mp4'
import santiMalano21 from '../../videos/reels/Santi_Malano/sm21.mp4'
import santiMalano22 from '../../videos/reels/Santi_Malano/sm22.mp4'
import santiMalano23 from '../../videos/reels/Santi_Malano/sm23.mp4'
import santiMalano24 from '../../videos/reels/Santi_Malano/sm24.mp4'
import santiMalano25 from '../../videos/reels/Santi_Malano/sm25.mp4'
import santiMalano26 from '../../videos/reels/Santi_Malano/sm26.mp4'
import santiMalano27 from '../../videos/reels/Santi_Malano/sm27.mp4'
import santiMalano28 from '../../videos/reels/Santi_Malano/sm28.mp4'
import santiMalano29 from '../../videos/reels/Santi_Malano/sm29.mp4'
import santiMalano30 from '../../videos/reels/Santi_Malano/sm30.mp4'
import santiMalano31 from '../../videos/reels/Santi_Malano/sm31.mp4'
//salteno
import salteno1 from '../../videos/reels/Salteno/s1.mp4'
import salteno2 from '../../videos/reels/Salteno/s2.mp4'
import salteno3 from '../../videos/reels/Salteno/s3.mp4'
import salteno4 from '../../videos/reels/Salteno/s4.mp4'
import salteno5 from '../../videos/reels/Salteno/s5.mp4'
import salteno6 from '../../videos/reels/Salteno/s6.mp4'
import salteno7 from '../../videos/reels/Salteno/s7.mp4'
import salteno8 from '../../videos/reels/Salteno/s8.mp4'
//varios
import varios1 from '../../videos/reels/Varios/v1.mp4'
import varios2 from '../../videos/reels/Varios/v2.mp4'
import varios3 from '../../videos/reels/Varios/v3.mp4'
import varios4 from '../../videos/reels/Varios/v4.mp4'
import varios5 from '../../videos/reels/Varios/v5.mp4'

export default function Experiencia({ renderExperiencia, renderSelected }) {
    const containerRef = useRef(null);
    const [clientState, setClientState] = useState('pabloFernandez')

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
                renderExperiencia()
            }
        });
    }

    const clientsImages = [
        {
            src: pabloFernandezFoto,
            id: 'pabloFernandez'
        },
        {
            src: norteVerdeFoto,
            id: 'norteVerde'
        },
        {
            src: santiMalanoFoto,
            id: 'santiMalano'
        },
        {
            src: saltenoFoto,
            id: 'salteno'
        },
        {
            src: variosFoto,
            id: 'varios'
        }
    ]
    const norteVerdeVideos = [norteVerde1, norteVerde2, norteVerde3, norteVerde4, norteVerde5, norteVerde6, norteVerde7, norteVerde8, norteVerde9]
    const pabloFernandezVideos = [pabloFernandez1, pabloFernandez2, pabloFernandez3, pabloFernandez4, pabloFernandez5, pabloFernandez6, pabloFernandez7, pabloFernandez8, pabloFernandez9, pabloFernandez10, pabloFernandez11]
    const santiMalanoVideos = [santiMalano1, santiMalano2, santiMalano3, santiMalano4, santiMalano5, santiMalano6, santiMalano7, santiMalano8, santiMalano9, santiMalano10, santiMalano11, santiMalano12, santiMalano13, santiMalano14, santiMalano15, santiMalano16, santiMalano17, santiMalano18, santiMalano19, santiMalano20, santiMalano21, santiMalano22, santiMalano23, santiMalano24, santiMalano25, santiMalano26, santiMalano27, santiMalano28, santiMalano29, santiMalano30, santiMalano31]
    const saltenoVideos = [salteno1, salteno2, salteno3, salteno4, salteno5, salteno6, salteno7, salteno8]
    const variosVideos = [varios1, varios2, varios3, varios4, varios5]

    function changeCliente(e) {
        let id = e.target.id
        switch (id) {
            case 'pabloFernandez':
                setClientState('pabloFernandez')
                break;
            case 'norteVerde':
                setClientState('norteVerde')
                break;
            case 'santiMalano':
                setClientState('santiMalano')
                break;
            case 'salteno':
                setClientState('salteno')
                break;
            case 'varios':
                setClientState('varios')
                break;
            default:
                break;
        }
    }

    return (
        <div className='background'>
            <div className="explorerContainer" ref={containerRef}>
                <div className="title-bar">
                    <h3>Experiencia</h3>
                    <button onClick={close}>X</button>
                </div>
                <div className="content">
                    <h3 style={{ textAlign: 'center', paddingBottom: '10px' }}>Trabajos Realizados</h3>
                    <div className='videoTrabajoContainer'>
                        <video src={norteVerdeVideo} controls muted preload='metadatos'></video>
                        <video src={pabloFernandezVideo} controls muted preload='metadatos'></video>
                    </div>
                    <div className='clientsBlock block'>
                        <h3 style={{ textAlign: 'center', padding: '10px' }}>Mis clientes</h3>
                        <div className='clientsContainer'>
                            {
                                clientsImages &&
                                clientsImages.map((clientImage, i) => (
                                    <img src={clientImage.src} id={clientImage.id} key={i} alt='cliente' className={`${clientState === clientImage.id ? 'selectedClient' : ''} clients`} onClick={changeCliente}></img>
                                ))
                            }
                        </div>
                        {
                            clientState === 'norteVerde' &&
                            <div>
                                <div className='reelsText'>
                                    <h3>Modelados</h3>
                                    <p>Combiné técnicas de dibujo tradicional con herramientas digitales avanzadas para destacar los edificios de la empresa de una manera única y atractiva.</p>
                                </div>
                                <section className='reelsQuote'>
                                    <h3>Norte Verde</h3>
                                    {/* <p>"La edición de video para mi canal de YouTube superó todas mis expectativas.
                                        No solo logró capturar la esencia de mi marca, sino que también  hicieron que mis videos se destacaran."
                                    </p> */}
                                    <div className='reelsLinks'>
                                        <a href='https://norte-verde.cl/' target='_blank'>Página Oficial</a>
                                        <a href='https://www.linkedin.com/company/norte-verde/' target='_blank'>LinkedIn</a>
                                        <a href='https://www.instagram.com/inorteverde/' target='_blank'>Instagram</a>
                                    </div>
                                </section>
                                <div className='reelsContainer'>
                                    {
                                        norteVerdeVideos &&
                                        norteVerdeVideos.map((norteVerdeVideo, i) => (
                                            <video src={norteVerdeVideo} controls preload='metadatos' muted key={i}></video>
                                        ))
                                    }
                                </div>
                            </div>

                        }
                        {
                            clientState === 'pabloFernandez' &&
                            <div>
                                <div className='reelsText'>
                                    <h3>Corporativos</h3>
                                    <p>Producción y edición de videos corporativos profesionales que destacan la identidad y los valores de tu empresa, ayudando a comunicar tu mensaje de manera efectiva y atractiva.</p>
                                </div>
                                <section className='reelsQuote'>
                                    <h3>Pablo Fernandez</h3>
                                    <p>"La edición de video para mi canal de YouTube superó todas mis expectativas.
                                        No solo logró capturar la esencia de mi marca, sino que también  hicieron que mis videos se destacaran."
                                    </p>
                                    <div className='reelsLinks'>
                                        <a href='https://www.youtube.com/@6R.Institue' target='_blank'>Youtube</a>
                                        <a href='https://www.linkedin.com/in/pablo-fernandez-marketingtech/' target='_blank'>LinkedIn</a>
                                    </div>
                                </section>
                                <div className='reelsContainer'>
                                    {
                                        pabloFernandezVideos &&
                                        pabloFernandezVideos.map((pabloFernandezVideo, i) => (
                                            <video src={pabloFernandezVideo} controls preload='metadatos' muted key={i}></video>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                        {
                            clientState === 'santiMalano' &&
                            <div>
                                <div className='reelsText'>
                                    <h3>Tendencias</h3>
                                    <p>Creación y edición de videos que incorporan las tendencias más actuales en estructura y edición, manteniendo tu contenido relevante y atractivo.</p>
                                </div>
                                <section className='reelsQuote'>
                                    <h3>Santiago Malano</h3>
                                    <p>"Gracias a la edición de Fran, mis videos en redes  ganaron más interacción y se ven mucho mejor."</p>
                                    <div className='reelsLinks'>
                                        <a href='https://www.youtube.com/@santimalano' target='_blank'>Youtube</a>
                                        <a href='https://www.instagram.com/santi.malano/' target='_blank'>Instagram</a>
                                    </div>
                                </section>
                                <div className='reelsContainer'>
                                    {
                                        santiMalanoVideos &&
                                        santiMalanoVideos.map((santiMalanoVideo, i) => (
                                            <video src={santiMalanoVideo} controls preload='metadatos' muted key={i}></video>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                        {
                            clientState === 'salteno' &&
                            <div>
                                <div className='reelsText'>
                                    <h3>Highlights</h3>
                                    <p>Edición dinámica de highlights que capturan los mejores momentos, ideal para jugadas, momentos graciosos.</p>
                                </div>
                                <section className='reelsQuote'>
                                    <h3>Salteno</h3>
                                    {/* <p>"La edición de video para mi canal de YouTube superó todas mis expectativas.
                                        No solo logró capturar la esencia de mi marca, sino que también  hicieron que mis videos se destacaran."
                                    </p> */}
                                    <div className='reelsLinks'>
                                        <a href='https://www.twitch.tv/Saltenno' target='_blank'>Twitch</a>
                                        <a href='https://www.tiktok.com/@saltenno' target='_blank'>Tiktok</a>
                                    </div>
                                </section>
                                <div className='reelsContainer'>
                                    {
                                        saltenoVideos &&
                                        saltenoVideos.map((saltenoVideo, i) => (
                                            <video src={saltenoVideo} controls preload='metadatos' muted key={i}></video>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                        {
                            clientState === 'varios' &&
                            <div>
                                <div className='reelsText'>
                                    <h3>Variedad</h3>
                                    <p>Trabajé en una amplia gama de proyectos, desde videos promocionales hasta contenido para redes sociales, adaptándome a diferentes estilos y necesidades.</p>
                                </div>
                                <div className='reelsContainer'>
                                    {
                                        variosVideos &&
                                        variosVideos.map((variosVideo, i) => (
                                            <video src={variosVideo} controls preload='metadatos' muted key={i}></video>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
