import React from 'react'
import './sobreMi.css'

export default function SobreMi({ renderSobreMi }) {
    return (
        <div className='background'>
            <div className="explorerContainer">
                <div className="title-bar">
                    <h3>Sobre Mí</h3>
                    <button onClick={renderSobreMi}>X</button>
                </div>
                <div className="content">asddad</div>
            </div>
        </div>
    )
}