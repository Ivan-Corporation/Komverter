import React, { useState, useEffect, useRef, Fragment } from 'react'

// Electron
const { remote, ipcRenderer } = window.require('electron')
const { Menu, MenuItem } = remote

// Components
import TitleBar from './title-bar/title-bar.component.jsx'
import ProgressBar from './progress-bar/progress-bar.component.jsx'

// Assets
import DownloadIcon from '../assets/download-icon.png'
import youtube from '../assets/youtube.png'

// Styles
import './app.css'

const App = () => {
  // State
  const [url, setUrl] = useState('')
  const [format, setFormat] = useState('mp3')
  const [downloadPercentage, setDownloadPercentage] = useState(0)
  const [displayMessage, setDisplayMessage] = useState('📎 Ready')

  // Refs
  const buttonRef = useRef()
  const inputRef = useRef()

  const startDownload = e => {
    e.preventDefault()

    if (url.trim()) {
      ipcRenderer.send('download', { url, format })
      buttonRef.current.disabled = true
    }
  }

  useEffect(() => {
    const menu = new Menu()

    const menuItem = new MenuItem({
      label: 'Paste URL',
      role: 'paste',
    })

    menu.append(menuItem)

    inputRef.current.addEventListener(
      'contextmenu',
      event => {
        event.preventDefault()
        menu.popup(remote.getCurrentWindow())
      },
      false
    )
  }, [])

  useEffect(() => {
    inputRef.current.focus()

    ipcRenderer.on('download:progress', (event, percentage) => {
      setDownloadPercentage(percentage)
      setDisplayMessage(`⚡ Working: ${Math.round(percentage)}% complete...`)
    })

    ipcRenderer.on('download:success', () => {
      setUrl('')
      setDownloadPercentage(0)
      setDisplayMessage('🎉 Done!')
      buttonRef.current.disabled = false

      setTimeout(() => {
        setDisplayMessage('📎 Ready')
      }, 2000)
    })

    ipcRenderer.on('download:error', (event, error) => {
      setDisplayMessage(error.message)
      buttonRef.current.disabled = false
    })
  }, [])

  return (
    <div className="app-wrapper">
      <TitleBar />
      <div className="padding">
        <div className="display">
          <p>{displayMessage}</p>
        </div>
        <img src={youtube} />
        <h4 style={{ marginBottom: '10px' }}>Paste Youtube video link here:</h4>
        <form className="form">
          <input
            type="text"
            value={url}
            ref={inputRef}
            className="input"
            onChange={e => setUrl(e.target.value)}
          />
          <select
            onChange={e => {
              setFormat(e.target.value)
            }}
          >
            <option >mp3 🎸</option>
            <option>mp4 🎻</option>
          </select>
          <button
            ref={buttonRef}
            onClick={startDownload}
            className="download-btn"
          >
            {downloadPercentage > 0 ? (
              '...'
            ) : (
              <Fragment>
                {' '}
                <img src={DownloadIcon} alt="download icon" style={{ marginRight: '8px' }} />  Download
              </Fragment>
            )}
          </button>
        </form>

        <ProgressBar percentage={downloadPercentage} />
      </div>
    </div>
  )
}

export default App
