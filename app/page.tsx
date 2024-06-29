'use client'

import cx from 'classnames'

import { Flyout } from './components/flyout'
import styles from './page.module.css'

const Home = () => {
  return (
    <header className={styles.header}>
      <Flyout
        render={({ status }) => (
          <div className={cx(styles.box, styles[status])}></div>
        )}
      />
      <h1 className={styles.words}>Words</h1>
    </header>
  )
}

export default Home
