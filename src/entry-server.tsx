import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

// Rendered at build time by prerender.js so the page ships real text instead of
// an empty <div id="root">. Every browser API in this app lives inside an
// effect or an event handler, so nothing here touches window or document.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
