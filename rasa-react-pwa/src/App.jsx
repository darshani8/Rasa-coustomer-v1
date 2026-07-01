import { useState, useEffect } from 'react'
import Template from './generated/Template.jsx'
import { computeVals } from './state/logic.js'
import { useRasaState } from './state/useRasaState.js'
import { applyTheme, PALETTES, FONTS, SHAPES } from './state/theme.js'

const DEFAULT_THEME = { palette: 'Maroon & Olive', displayFont: 'Geometric', cardShape: 'Soft' }

export default function App() {
  const { getState, setState } = useRasaState()
  const [theme, setTheme] = useState(DEFAULT_THEME)

  // apply palette / font / shape as CSS variables on <html>
  useEffect(() => {
    applyTheme(theme)
    return () => applyTheme({})
  }, [theme])

  // live queue countdown — decrements qSec once a second
  useEffect(() => {
    const t = setInterval(() => setState((s) => ({ qSec: s.qSec > 0 ? s.qSec - 1 : 0 })), 1000)
    return () => clearInterval(t)
  }, [setState])

  const vals = computeVals(getState, setState, theme)

  return (
    <div className="rasa-root">
      <Template vals={vals} />
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
    </div>
  )
}

function ThemeSwitcher({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const groups = [
    { key: 'palette', label: 'Palette', options: PALETTES },
    { key: 'displayFont', label: 'Display font', options: FONTS },
    { key: 'cardShape', label: 'Card shape', options: SHAPES },
  ]
  return (
    <div className="rasa-theme">
      <button className="rasa-theme-fab" aria-label="Theme settings" onClick={() => setOpen((o) => !o)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
      {open && (
        <div className="rasa-theme-panel">
          <div className="rasa-theme-title">Theme</div>
          {groups.map((g) => (
            <div key={g.key} className="rasa-theme-group">
              <div className="rasa-theme-label">{g.label}</div>
              <div className="rasa-theme-chips">
                {g.options.map((opt) => (
                  <button
                    key={opt}
                    className={'rasa-theme-chip' + (theme[g.key] === opt ? ' is-active' : '')}
                    onClick={() => setTheme((t) => ({ ...t, [g.key]: opt }))}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
