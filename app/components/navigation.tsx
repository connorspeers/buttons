'use client'

import cx from 'classnames'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useRef, useState } from 'react'
import { ButtonsNavLink } from '@/buttons/buttons-nav-link'
import { spin } from '@/lib/client'
import styles from './navigation.module.css'
import Link from 'next/link'

export type NavigationState = {
  open: boolean
}

export type NavigationActions = {
  setOpen: (open: boolean) => void
  open: () => void
  close: () => void
  toggle: () => void
}

export type NavigationSlice = { state: NavigationState } & NavigationActions

const NavigationContext = createContext<NavigationSlice>({
  state: { open: false },
  setOpen: () => {},
  open: () => {},
  close: () => {},
  toggle: () => {},
})

export const useNavigation = () => useContext(NavigationContext)

export const NavigationProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const path = usePathname()
  const [open, setOpen] = useState(path === '/')

  return (
    <NavigationContext.Provider
      value={{
        state: {
          open,
        },
        setOpen,
        open: () => setOpen(true),
        close: () => setOpen(false),
        toggle: () => setOpen(!open),
      }}
    >{children}</NavigationContext.Provider>
  )
}

export const Navigation = () => {
  const nav = useNavigation()
  const path = usePathname()
  const diamondRef = useRef<HTMLButtonElement>(null)

  return (
    <nav
      className={cx(styles.nav, {
        [styles.open]: nav.state.open,
      })}
    >
      <button
        ref={diamondRef}
        className={styles.diamond}
        aria-hidden
        onClick={() => {
          if (!diamondRef.current) return
          if (path === '/') {
            spin(diamondRef.current, { from: '225deg', to: '405deg' })
            return
          }
          nav.toggle()
        }}
      ></button>
      <div className={styles.menu}>
        <header className={styles.header}>
          <p>vandalized by <Link href="/">connor</Link></p>
        </header>
        <section className={styles.links}>
          <ButtonsNavLink />
        </section>
        <footer className={styles.footer}>
          <p className={styles.inspiration}>
            {/* order reversed for selector trickery on link hover */}
            {/* <a href="https://box-shadows.co/" target="_blank">box-shadows.co</a>
            <span>nav design inspired by&nbsp;</span> */}
          </p>
        </footer>
      </div>
    </nav>
  )
}
