export type CSSProperties = Record<string, string | number | null>

export const setStyle = (elt: HTMLElement, properties: CSSProperties) => {
  if (!properties) return
  for (const [k, v] of Object.entries(properties)) {
    elt.style.setProperty(k, typeof v === 'number' ? `${v}px` : v)
  }
}

export const removeStyle = (elt: HTMLElement, ...properties: (string | CSSProperties)[]) => {
  for (const p of properties) {
    if (!p) continue
    if (typeof p === 'object') {
      for (const k of Object.keys(p)) {
        elt.style.removeProperty(k)
      }
    } else {
      elt.style.removeProperty(p)
    }
  }
}

export const afterPaint = (cb: () => void) =>
  requestAnimationFrame(() => requestAnimationFrame(cb))

export const spin = (elt: HTMLElement, opts: {
  duration?: string
  from?: string
  to?: string
  hold?: boolean
}) => {
  setStyle(elt, {
    transition: 'none',
    transform: `rotate(${opts?.from ?? '0deg'})`
  })

  afterPaint(() => {
    setStyle(elt, {
      transition: `transform ${opts?.duration ?? '0.5s'} ease-in-out`,
      transform: `rotate(${opts?.to ?? '360deg'})`,
    })

    // if (!opts?.hold) {
      elt.addEventListener('transitionend', () => {
        setStyle(elt, { transition: 'none', transform: null })
        afterPaint(() => removeStyle(elt, 'transition'))
      }, { once: true })
    // }
  })
}
