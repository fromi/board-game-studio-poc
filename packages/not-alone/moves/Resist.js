import {loseWillCounter} from './LoseWillCounter'
import {getHunted} from '../NotAlone'
import {isExplorationMove} from '../phases/Exploration'

export const RESIST = 'Resist'
export const resist = (huntedId) => ({type: RESIST, huntedId})

export const Resist = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    game.nextMoves.push(loseWillCounter(move.huntedId, RESIST))
    hunted.ongoingAction = {type: RESIST, cardsLeft: 2}
  },

  undoable: (move, nextMoves) => !nextMoves.some(nextMove => isExplorationMove(nextMove, move.huntedId)),

  effect: (move, nextMoves) => {
    const nextExplorationMoveIndex = nextMoves.findIndex(nextMove => isExplorationMove(nextMove, move.huntedId))
    if (nextExplorationMoveIndex !== -1) {
      nextMoves = nextMoves.slice(0, nextExplorationMoveIndex)
    }
    return nextMoves.filter(nextMoves => nextMoves.huntedId === move.huntedId)
  }
}