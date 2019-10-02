import {loseWillCounter} from '../../moves/LoseWillCounter'
import {HUNT_CARD, HUNTING} from '../../NotAlone'
import {FIERCENESS} from '../HuntCards'

export const Fierceness = {
  phase: HUNTING,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: FIERCENESS},

  huntedCaughtByCreature: (game, huntedId) => {
    game.nextMoves.push(loseWillCounter(huntedId))
  }
}
