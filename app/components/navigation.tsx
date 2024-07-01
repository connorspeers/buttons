'use client'

import styles from './navigation.module.css'

const Diamond = () => (
  <button
    className={styles.diamond}
    onClick={(evt) => {
      const button = evt.currentTarget
      if (!button || button.classList.contains(styles.fullSpin)) {
        return
      }

      button.classList.add(styles.fullSpin)
      button.addEventListener('animationend', () => {
        button.classList.remove(styles.fullSpin)
      })
    }}
  >this button does nothing</button>
)

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
