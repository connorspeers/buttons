// export type StyleProps = Record<string, string | number>

// export const setStyle = (elt: HTMLElement, properties: StyleProps) => {
//   if (!properties) {
//     return
//   }
//   for (const [k, v] of Object.entries(properties)) {
//     elt.style.setProperty(k, typeof v === 'number' ? `${v}px` : v)
//   }
// }

// export const removeStyle = (elt: HTMLElement, ...properties: (string | StyleProps)[]) => {
//   for (const p of properties) {
//     if (!p) {
//       continue
//     }
//     if (typeof p === 'object') {
//       for (const k of Object.keys(p)) {
//         elt.style.removeProperty(k)
//       }
//     } else {
//       elt.style.removeProperty(p)
//     }
//   }
// }

export const afterPaint = (cb: () => void) =>
  requestAnimationFrame(() => requestAnimationFrame(cb))
