import {HUNT_CARD} from '../../NotAlone'
import {PERSECUTION} from '../HuntCards'
import {HUNTING} from '../../Phases'

export const Persecution = {
  phase: HUNTING,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: PERSECUTION})
}
