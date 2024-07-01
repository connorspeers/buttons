'use client'

import { ReactNode } from 'react'

import { Navigation, NavigationContext, useNavigation } from '@/app/components/navigation'

export const DefaultLayout = ({ children }: {
  children: ReactNode
}) => {
  const nav = useNavigation()

  return (
    <html lang="en">
      <body>
        <NavigationContext.Provider value={nav}>
          <Navigation />
          {children}
        </NavigationContext.Provider>
      </body>
    </html>
  )
}
