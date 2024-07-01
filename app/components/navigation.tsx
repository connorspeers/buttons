'use client'

import cx from 'classnames'
import { createContext, useContext, useState } from 'react'

import styles from './navigation.module.css'

export type NavigationState = {
  open: boolean
}

export type NavigationActions = {
  setOpen: (open: boolean) => void
}

export type NavigationContextValue = NavigationState & NavigationActions

export const NavigationContext = createContext<NavigationContextValue>({
  open: false,
  setOpen: () => {},
})

export const useNavigation = (initialState?: NavigationState): NavigationContextValue => {
  const [state, setState] = useState<NavigationState>(initialState ?? {
    open: false,
  })

  return {
    ...state,
    setOpen: (open) => setState({ ...state, open }),
  }
}

export const Navigation = () => {
  const nav = useContext(NavigationContext)

  return (
    <nav
      className={cx(styles.nav, {
        [styles.open]: nav.open,
      })}
    >
      <button
        className={styles.diamond}
        aria-hidden
        onClick={() => {
          nav.setOpen(!nav.open)
        }}
      ></button>
      <div className={styles.menu}>
        <header className={styles.header}>
          <p>vandalized by <a href="https://speers.dev">connor</a></p>
        </header>
        <section className={styles.previews}>
          nav
        </section>
        <footer className={styles.footer}>
          <p className={styles.inspiration}>
            {/* order reversed for selector trickery on link hover */}
            <a href="https://box-shadows.co/" target="_blank">box-shadows.co</a>
            <span>nav design inspired by&nbsp;</span>
          </p>
        </footer>
      </div>
    </nav>
  )
}
