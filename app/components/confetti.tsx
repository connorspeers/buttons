// Thank you, Max: https://github.com/almond-bongbong/react-confetti-boom

'use client'

import { useEffect, useState } from 'react'
import ConfettiBoom from 'react-confetti-boom'
import styles from './confetti.module.css'

/**
 * X and Y coordinates of a confetti boom as a ratio of window dimensions. i.e. Pixel position
 * needs to be divided by `window.innerWidth` (X) and `window.innerHeight` (Y).
 */
export type ConfettiCoordinates = {
  x: number
  y: number
}

export type ConfettiState = {
  coordinates: ConfettiCoordinates | null
}

export type ConfettiActions = {
  boom: (coordinates: ConfettiCoordinates) => void
}

export type ConfettiSlice = { state: ConfettiState } & ConfettiActions

export const useConfetti = (): ConfettiSlice => {
  const [coordinates, setCoordinates] = useState<ConfettiCoordinates | null>(null)

  useEffect(() => {
    if (coordinates) {
      const timeout = setTimeout(() => setCoordinates(null), 250) // cooldown
      return () => clearTimeout(timeout)
    }
  }, [coordinates])

  return {
    state: {
      coordinates,
    },
    boom: (newCoordinates) => {
      if (!coordinates) {
        setCoordinates(newCoordinates)
      }
    },
  }
}

/**
 * Notes:
 *
 * - Container positioning breaks if any parent is fixed or
 *   [transformed](https://n0rush.medium.com/css-position-fixed-is-not-always-relative-to-viewport-ac37d78e2f13)
 */
export const Confetti = ({ coordinates }: ConfettiState) => {
  return (
    <div className={styles.confetti}>
      <ConfettiBoom
        mode="boom"
        x={coordinates?.x}
        y={coordinates?.y}
        effectCount={coordinates ? 1 : 0}
        particleCount={40}
        colors={[
          '#ed2224', // red
          '#f99621', // orange
          '#f1eb1b', // yellow
          '#63c720', // green
          '#3954a5', // blue
          '#61379b', // indigo
          '#93288e', // violet
        ]}
      />
    </div>
  )
}
