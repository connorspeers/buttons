import Link, { LinkProps } from 'next/link'
import { forwardRef } from 'react'

export type ButtonProps = Omit<LinkProps, 'href'> & {
  className?: string
  href?: string
  children?: React.ReactNode
}

export const Button = forwardRef(
  ({ href, children, ...props }: ButtonProps, ref: React.ForwardedRef<Element>) => {
    return href !== undefined ? (
      <Link
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        {...props}
      >{children}</Link>
    ) : (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}
      >{children}</button>
    )
  }
)
