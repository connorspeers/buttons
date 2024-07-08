import { Metadata } from 'next'

import './globals.css'
import { Navigation, NavigationProvider } from './components/navigation'

export const metadata: Metadata = {
  title: 'demos',
  description: 'random web experiments',
}

const RootLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          <Navigation />
          {children}
        </NavigationProvider>
      </body>
    </html>
  )
}

export default RootLayout
