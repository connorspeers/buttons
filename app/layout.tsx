import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'next-demos',
  description: 'pizza',
}

const RootLayout = ({ children }: {
  children: ReactNode
}) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
)

export default RootLayout
