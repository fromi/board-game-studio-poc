import {END_OF_TURN_ACTIONS, HUNT_CARD} from '../../NotAlone'
import {TRACKING} from '../HuntCards'

export const Tracking = {
  phase: END_OF_TURN_ACTIONS,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: TRACKING})
}
