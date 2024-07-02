'use client'

import { ParticleButtonDemo } from './particle-button-demo'
import styles from './buttons-page.module.css'
import { useNavigation } from '@/components/navigation'
import cx from 'classnames'

export const ButtonsPage = () => {
  const nav = useNavigation()

  return (
    <main className={cx(styles.main, {
      [styles.open]: !nav.state.open,
    })}>
      <ParticleButtonDemo />
    </main>
  )
}
