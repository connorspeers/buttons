'use client'

import cx from 'classnames'
import { useContext } from 'react'

import { NavigationContext } from '@/app/components/navigation'

import styles from './home-page.module.css'

export const HomePage = () => {
  const nav = useContext(NavigationContext)

  return (
    <main
      className={cx(styles.main, {
        [styles.navOpen]: nav.open,
      })}
    >main</main>
  )
}
