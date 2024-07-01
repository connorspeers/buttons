import { Metadata } from 'next'

import { Navigation } from './components/navigation'

export const metadata: Metadata = {
  title: 'next demos',
  description: 'i\'m sorry you had to see these',
}

const Home = () => (
  <Navigation />
)

export default Home
