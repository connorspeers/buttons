'use client'

import cx from 'classnames'
import { MouseEventHandler, useState } from 'react'

import styles from './navigation.module.css'

export const Navigation = () => {
  const [open, setOpen] = useState(true)

  return (
    <nav
      className={cx(styles.nav, {
        [styles.open]: open,
      })}
    >
      <button
        className={styles.diamond}
        onClick={() => {
          setOpen(!open)
        }}
      >this button does nothing</button>
      <header className={styles.header}>
        <p className={styles.sig}>vandalized by <a href="https://speers.dev">connor</a></p>
      </header>
      <footer className={styles.footer}>
        <p className={styles.inspiration}>
          {/* order reversed on purpose */}
          <a href="https://box-shadows.co/" target="_blank">box-shadows.co</a>
          <span>nav design inspired by&nbsp;</span>
        </p>
      </footer>
    </nav>
  )
}
