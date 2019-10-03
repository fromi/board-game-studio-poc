import {HUNT_CARD} from '../../NotAlone'
import {STASIS} from '../HuntCards'
import {END_OF_TURN_ACTIONS} from '../../Phases'

export const Stasis = {
  phase: END_OF_TURN_ACTIONS,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: STASIS})
}
