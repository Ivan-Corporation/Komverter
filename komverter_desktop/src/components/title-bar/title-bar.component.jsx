import React from 'react'


// Electron
const { remote } = window.require('electron')

// Styles
import './title-bar.styles.css'

const TitleBar = () => {
  const closeWindow = () => {
    remote.getCurrentWindow().close()
  }

  const minimizeWindow = () => {
    remote.getCurrentWindow().minimize()
  }



  return (
    <header className="title-bar">
      <div className="controls">
        <button className="close" onClick={closeWindow}>✖️</button>
        <button className="min" onClick={minimizeWindow}>➖</button>
      </div>
      <p className="title">Komverter</p>
    </header>
  )
}

export default TitleBar
