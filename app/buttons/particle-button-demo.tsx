'use client'

import { useState, useEffect } from 'react'
import {
  ParticleButton,
  ParticleButtonEffects as effects,
  ParticleButtonEffectLabels as labels,
} from './particle-button'
import styles from './particle-button-demo.module.css'
import cx from 'classnames'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { IoMove } from 'react-icons/io5'

type Position = {
  x: number
  y: number
}

const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max)
}

const dragStop = 64

export const ParticleButtonDemo = () => {
  const [current, setCurrent] = useState(0)
  const [grabbed, setGrabbed] = useState<Position | null>(null)
  const [prevOffset, setPrevOffset] = useState<Position>({ x: 0, y: 0 })
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 })

  useEffect(() => {
    if (!grabbed) {
      setPrevOffset(offset)
    }
  }, [grabbed, offset])

  // TODO: Solve confetti canvas disappearing when moving button demo
  useEffect(() => {
    if (!grabbed) return

    const move = (evt: MouseEvent) => {
      const mouseDown = (evt.buttons & 1) === 1;

      if (!mouseDown) {
        setGrabbed(null)
        return
      }

      setOffset({
        x: (
          prevOffset.x
          + clamp(evt.clientX, dragStop, window.innerWidth - dragStop)
          - grabbed.x
        ),
        y: (
          prevOffset.y
          + clamp(evt.clientY, dragStop, window.innerHeight - dragStop)
          - grabbed.y
        ),
      })
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [grabbed, prevOffset])

  const grab = (evt: React.MouseEvent) => {
    setGrabbed({ x: evt.clientX, y: evt.clientY })
  }

  const release = () => {
    setGrabbed(null)
  }

  const prevDisabled = current === 0
  const nextDisabled = current === effects.length - 1

  return (
    <section
      className={styles.wrap}
      style={{
        left: `${offset.x}px`,
        top: `${offset.y}px`,
      }}
    >
      <header className={styles.header}>
        <h2 className={styles.heading}>Particle Button</h2>
        <button
          className={styles.move}
          aria-hidden="true"
          onMouseDown={grab}
          onMouseUp={release}
        >
          <IoMove />
        </button>
      </header>
      <div className={styles.buttons}>
        {effects.map((effect, i) => (
          <ParticleButton
            key={effect}
            className={cx(styles.button, {
              [styles.left]: current > i,
              [styles.right]: current < i,
            })}
            effect={effect}
            triggerOnHover
            triggerOnClick
          >{labels[effect]}</ParticleButton>
        ))}
      </div>
      <nav className={styles.nav}>
        <button
          className={styles.navButton}
          disabled={prevDisabled}
          aria-disabled={prevDisabled ? 'true' : undefined}
          tabIndex={prevDisabled ? -1 : 0}
          onClick={() => {
            if (!prevDisabled) {
              setCurrent(current - 1)
            }
          }}
        ><FaAngleLeft /></button>
        <button
          className={styles.navButton}
          disabled={nextDisabled}
          aria-disabled={nextDisabled ? 'true' : undefined}
          tabIndex={nextDisabled ? -1 : 0}
          onClick={() => {
            if (!nextDisabled) {
              setCurrent(current + 1)
            }
          }}
        ><FaAngleRight /></button>
      </nav>
    </section>
  )
}
