import {HUNT_CARD} from '../../NotAlone'
import {TRACKING} from '../HuntCards'
import {END_OF_TURN_ACTIONS} from '../../Phases'

export const Tracking = {
  phase: END_OF_TURN_ACTIONS,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: TRACKING})
}
