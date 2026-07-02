import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// vite-plugin-pwa (injectRegister: 'auto') injects the service-worker registration at build time,
// so no manual navigator.serviceWorker.register() is needed here.

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
