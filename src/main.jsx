import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Downloader from './Downloader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Downloader />
  </StrictMode>,
)
