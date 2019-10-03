import {loseWillCounter} from '../../moves/LoseWillCounter'
import {HUNT_CARD} from '../../NotAlone'
import {FIERCENESS} from '../HuntCards'
import {HUNTING} from '../../Phases'

export const Fierceness = {
  phase: HUNTING,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: FIERCENESS},

  huntedCaughtByCreature: (game, huntedId) => {
    game.nextMoves.push(loseWillCounter(huntedId))
  }
}
