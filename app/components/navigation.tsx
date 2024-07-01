'use client'

import cx from 'classnames'
import { useState } from 'react'

import styles from './navigation.module.css'

const Diamond = () => {
  const [fullSpin, setFullSpin] = useState(false)
  const [reverse, setReverse] = useState(false)

  return (
    <button
      className={cx(styles.diamond, {
        [styles.fullSpin]: fullSpin,
        [styles.reverse]: reverse,
      })}
      onClick={(evt) => {
        setFullSpin(true)
        evt.target.addEventListener('animationend', () => {
          setFullSpin(false)
          setReverse(!reverse)
        })
      }}
    >this button does nothing</button>
  )
}

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <header className={styles.header}>
        <Diamond />
        <h1>next demos</h1>
        <h2>vandalism by <a href="https://speers.dev">connor</a></h2>
      </header>
      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>
        <a href="https://box-shadows.co/" target="_blank">box-shadows.co</a>
        <span>nav design inspired by&nbsp;</span>
      </footer>
    </nav>
  )
}
