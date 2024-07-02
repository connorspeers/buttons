import { useNavigation } from '@/components/navigation'

import { ParticleButton } from './particle-button'

export const ButtonsNavLink = () => {
  const nav = useNavigation()

  return (
    <ParticleButton
      href="/buttons/"
      triggerOnHover
      triggerOnClick
      onClick={nav.close}
    >Buttons</ParticleButton>
  )
}
