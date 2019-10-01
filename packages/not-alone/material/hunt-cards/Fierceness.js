import {loseWillCounter} from '../../moves/LoseWillCounter'

export const Fierceness = {
  phase: 2,

  huntedCaughtByCreature: (game, huntedId) => {
    game.nextMoves.push(loseWillCounter(huntedId))
  }
}
