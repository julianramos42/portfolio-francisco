import React from 'react'
import './experiencia.css'

export default function Experiencia({ renderExperiencia }) {
    return (
        <div className="explorerContainer">
            <div className="title-bar">
                <h3>Experiencia</h3>
                <button onClick={renderExperiencia}>X</button>
            </div>
            <div className="content">asddad</div>
        </div>
    )
}
