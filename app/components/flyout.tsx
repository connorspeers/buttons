'use client'

// NOTE: this is just a poc, not currently being used

import { useState, useRef, CSSProperties, ReactNode } from 'react'

import { afterPaint } from '@/lib/client'

import styles from './flyout.module.css'

export type FlyoutStatus = 'closed' | 'opening' | 'open' | 'closing'

export const Flyout = ({
  render,
  transition = 'all 0.4s'
}: {
  render: (props: { status: FlyoutStatus }) => ReactNode
  transition?: string
}) => {
  const flyoutRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<FlyoutStatus>('closed')
  const [style, setStyle] = useState<CSSProperties>({})
  const [origin, setOrigin] = useState<DOMRect | null>(null)

  const toggle = () => {
    const flyout = flyoutRef.current
    if (!flyout) {
      return
    }

    switch (status) {
      case 'closed': {
        const origin = flyout.getBoundingClientRect()
        setOrigin(origin)
  
        setStatus('opening')
        setStyle({
          position: 'fixed',
          top: `${origin.top}px`,
          left: `${origin.left}px`,
          width: `${origin.width}px`,
          height: `${origin.height}px`,
          transition,
        })
  
        afterPaint(() => {
          const openStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          } as const

          setStyle({ ...openStyle, transition })
          flyout.addEventListener('transitionend', () => {
            setStyle(openStyle)
            setStatus('open')
          }, { once: true })
        })
  
        return
      }

      case 'open': {
        setStatus('closing')
        setStyle({
          position: 'fixed',
          top: `${origin!.top}px`,
          left: `${origin!.left}px`,
          width: `${origin!.width}px`,
          height: `${origin!.height}px`,
          transition,
        })
    
        flyout.addEventListener('transitionend', () => {
          setStatus('closed')
          setOrigin(null)
          setStyle({})
        }, { once: true })
        
        return
      }
    }
  }

  return <>
    {origin && (
      // Shadow, to prevent layout shift
      <div
        style={{
          width: `${origin.width}px`,
          height: `${origin.height}px`,
        }}
      ></div>
    )}
    <div
      ref={flyoutRef}
      className={styles.flyout}
      style={style}
      onClick={toggle}
    >
      {render({ status })}
    </div>
  </>
}
