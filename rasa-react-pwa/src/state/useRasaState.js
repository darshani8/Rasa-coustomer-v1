import { useState, useRef, useCallback, useEffect } from 'react'
import { initialState } from './logic.js'

// React-side state store that mimics the reference DCLogic setState semantics:
//   - patch-merge (object or updater function)
//   - optional callback fired after the state has committed
//   - a getState() that always returns the latest committed state, so handler
//     closures created during render never read a stale snapshot.
export function useRasaState() {
  const [state, setRaw] = useState(initialState)
  const stateRef = useRef(state)
  stateRef.current = state
  const cbs = useRef([])

  const getState = useCallback(() => stateRef.current, [])

  const setState = useCallback((update, cb) => {
    setRaw((prev) => {
      const patch = typeof update === 'function' ? update(prev) : update
      return { ...prev, ...patch }
    })
    if (typeof cb === 'function') cbs.current.push(cb)
  }, [])

  // flush setState callbacks after commit (getState() now returns fresh state)
  useEffect(() => {
    if (!cbs.current.length) return
    const q = cbs.current
    cbs.current = []
    q.forEach((fn) => {
      try {
        fn()
      } catch (e) {
        console.error(e)
      }
    })
  })

  return { state, getState, setState }
}
