import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/app.css'

createRoot(document.getElementById('root')).render(<App />)

// register the service worker for offline / installable PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) || '/'
    navigator.serviceWorker.register(base + 'sw.js').catch(() => {})
  })
}
