import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/transitionFix.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import 'keen-slider/keen-slider.min.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
