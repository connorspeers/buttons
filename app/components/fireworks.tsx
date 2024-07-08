
import { useState, RefObject, useRef, useEffect, forwardRef } from 'react'
import styles from './fireworks.module.css'
import cx from 'classnames'

export type FireworksState = {
  rootRef: RefObject<HTMLElement>
  launched: boolean
}

export type FireworksActions = {
  launch: () => void
}

export type FireworksSlice = { state: FireworksState } & FireworksActions

export const useFireworks = (): FireworksSlice => {
  const rootRef = useRef<HTMLElement>(null)
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (launched) {
      const off = () => setLaunched(false)
      root.addEventListener('transitionend', off, { once: true })
      return () => root.removeEventListener('transitionend', off)
    }
  }, [launched])

  return {
    state: {
      rootRef,
      launched,
    },
    launch: () => setLaunched(true),
  }
}

export const Fireworks = ({ rootRef, launched }: FireworksState) => {
  return (
    <div
      ref={rootRef as RefObject<HTMLDivElement>}
      className={cx(styles.wrap, {
        [styles.launched]: launched,
      })}
    >TODO</div>
  )
}
