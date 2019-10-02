import {END_OF_TURN_ACTIONS, HUNT_CARD} from '../../NotAlone'
import {STASIS} from '../HuntCards'

export const Stasis = {
  phase: END_OF_TURN_ACTIONS,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: STASIS})
}
