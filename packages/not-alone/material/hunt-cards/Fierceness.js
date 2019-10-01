import {loseWillCounter} from '../../moves/LoseWillCounter'
import {HUNTING} from '../../NotAlone'

export const Fierceness = {
  phase: HUNTING,

  huntedCaughtByCreature: (game, huntedId) => {
    game.nextMoves.push(loseWillCounter(huntedId))
  }
}
