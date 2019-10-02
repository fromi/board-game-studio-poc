import {HUNT_CARD, HUNTING} from '../../NotAlone'
import {PERSECUTION} from '../HuntCards'

export const Persecution = {
  phase: HUNTING,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: PERSECUTION})
}
