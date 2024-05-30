import React from 'react'
import './contacto.css'

export default function Contacto({ renderContacto }) {
    return (
        <div className="explorerContainer">
            <div className="title-bar">
                <h3>Contacto</h3>
                <button onClick={renderContacto}>X</button>
            </div>
            <div className="content">asddad</div>
        </div>
    )
}
