'use client'

import { useRef } from 'react'
import { Button, ButtonProps } from './button'
import styles from './particle-button.module.css'
import cx from 'classnames'
import { Confetti, useConfetti } from '@/components/confetti'
import { Fireworks, useFireworks } from '@/components/fireworks'

// TODO: Challenge: Stack the confetti layer between the background and foreground of the button
// while also supporting transforms on a parent element. This might require a different confetti
// component, one that doesn't need a viewport-size container

export enum ParticleButtonEffect {
  confetti = 'confetti',
  fireworks = 'fireworks',
}

export const ParticleButtonEffects = Object.values(ParticleButtonEffect)

export const ParticleButtonEffectLabels: { [K in ParticleButtonEffect]: string } = {
  confetti: 'Confetti',
  fireworks: 'Fireworks',
}

export type ParticleButtonProps = ButtonProps & {
  classNameBg?: string
  classNameFg?: string
  effect?: ParticleButtonEffect
  triggerOnHover?: boolean
  triggerOnClick?: boolean
}

/**
 * Notes:
 *
 * - Confetti: If any container element is fixed or transformed, confetti position breaks
 */
export const ParticleButton = ({
  className,
  classNameBg,
  classNameFg,
  effect = ParticleButtonEffect.confetti,
  triggerOnHover,
  triggerOnClick,
  onClick,
  onMouseEnter,
  children,
  ...props
}: ParticleButtonProps) => {
  const buttonRef = useRef<Element>(null)
  const confetti = useConfetti()
  const fireworks = useFireworks()

  const trigger = () => {
    if (!buttonRef.current) return

    const { x, y, width, height } = buttonRef.current.getBoundingClientRect()

    // Confetti expects position as a decimal proportion of window size
    const buttonCenterConfetti = {
      x: (x + width / 2) / window.innerWidth,
      y: (y + height / 2) / window.innerHeight
    }

    switch (effect) {
      case ParticleButtonEffect.confetti: {
        confetti.boom(buttonCenterConfetti)
        return
      }
      case ParticleButtonEffect.fireworks: {
        fireworks.launch()
        return
      }
    }
  }

  const handleClick = (evt: React.MouseEvent) => {
    if (triggerOnClick) trigger()
    onClick?.(evt as React.MouseEvent<HTMLAnchorElement>) // TODO: Technically, it's not an anchor
  }

  const handleMouseEnter = (evt: React.MouseEvent) => {
    if (triggerOnHover) trigger()
    onMouseEnter?.(evt as React.MouseEvent<HTMLAnchorElement>)
  }

  return (
    <Button
      ref={buttonRef}
      className={cx(styles.button, className)}
      {...props}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className={cx(styles.bg, classNameBg, {
        [styles.confetti]: effect === ParticleButtonEffect.confetti,
        [styles.fireworks]: effect === ParticleButtonEffect.fireworks,
      })}></div>
      {effect === ParticleButtonEffect.confetti && (
        <Confetti {...confetti.state} />
      )}
      {effect === ParticleButtonEffect.fireworks && (
        <Fireworks {...fireworks.state} />
      )}
      <div className={cx(styles.fg, classNameFg)}>{children}</div>
    </Button>
  )
}
