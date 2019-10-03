import {THE_BEACH, THE_WRECK} from '../PlaceCards'
import {HUNT_CARD} from '../../NotAlone'
import {INTERFERENCE} from '../HuntCards'
import {HUNTING} from '../../Phases'

export const Interference = {
  phase: HUNTING,

  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: INTERFERENCE}),

  isPlaceIneffective: place => place === THE_BEACH || place === THE_WRECK
}
