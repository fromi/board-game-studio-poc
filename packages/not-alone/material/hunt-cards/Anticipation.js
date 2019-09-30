import {HUNT_CARD} from '../../NotAlone'
import {ANTICIPATION} from '../HuntCards'

export const Anticipation = {
  phase: 2,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: ANTICIPATION}
}
