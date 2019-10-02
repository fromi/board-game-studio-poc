import {THE_BEACH, THE_WRECK} from '../PlaceCards'
import {HUNT_CARD, HUNTING} from '../../NotAlone'
import {INTERFERENCE} from '../HuntCards'

export const Interference = {
  phase: HUNTING,

  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: INTERFERENCE}),

  isPlaceIneffective: place => place === THE_BEACH || place === THE_WRECK
}
