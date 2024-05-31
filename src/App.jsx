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
  let [isLoaded, setIsLoaded] = useState(false)

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
  function renderLoaded() {
    setIsLoaded(!isLoaded)
  }

  let functions = {
    sobreMi: renderSobreMi,
    experiencia: renderExperiencia,
    contacto: renderContacto,
    selected: renderSelected,
    loaded: renderLoaded
  }
  
  return (
    <>
      <ThreeScene functions={functions} isSelected={isSelected} isLoaded={isLoaded} />
      {sobreMiState && <SobreMi renderSobreMi={renderSobreMi} renderSelected={renderSelected} />}
      {experienciaState && <Experiencia renderExperiencia={renderExperiencia} renderSelected={renderSelected} />}
      {contactoState && <Contacto renderContacto={renderContacto} renderSelected={renderSelected} />}
      {
        (sobreMiState || experienciaState || contactoState) && <Footer /> }
    </>
  )
}