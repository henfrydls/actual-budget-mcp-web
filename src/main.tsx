import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// hydrateRoot, not createRoot: index.html already contains the markup, produced
// at build time. createRoot would throw it away and repaint on every visit.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
)
