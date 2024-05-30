import React, { useState } from 'react'
import ThreeScene from './ThreeScene'
import SobreMi from './Components/SobreMi/SobreMi'
import Experiencia from './Components/Experiencia/Experiencia'
import Contacto from './Components/Contacto/Contacto'
import Footer from './Components/Footer/Footer'

export default function App() {
  const [sobreMiState, setSobreMiState] = useState(false)
  const [experienciaState, setExperienciaState] = useState(false)
  const [contactoState, setContactoState] = useState(false)
  let [isSelected, setIsSelected] = useState(false)

  function renderSobreMi() {
    setSobreMiState(!sobreMiState)
  }
  function renderExperiencia() {
    setExperienciaState(!experienciaState)
  }
  function renderContacto() {
    setContactoState(!contactoState)
  }
  // esta es para ocultar el hover una vez que se abra la pestaña
  function renderSelected() {
    setIsSelected(!isSelected)
  }

  let functions = {
    sobreMi: renderSobreMi,
    experiencia: renderExperiencia,
    contacto: renderContacto,
    selected: renderSelected
  }
  
  return (
    <>
      <ThreeScene functions={functions} isSelected={isSelected} />
      {sobreMiState && <SobreMi renderSobreMi={renderSobreMi} />}
      {experienciaState && <Experiencia renderExperiencia={renderExperiencia} />}
      {contactoState && <Contacto renderContacto={renderContacto} />}
      {
        (sobreMiState || experienciaState || contactoState) && <Footer /> }
    </>
  )
}