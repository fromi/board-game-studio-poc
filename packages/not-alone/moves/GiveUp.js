import {getHunted} from '../NotAlone'
import {isExplorationMove} from '../phases/Exploration'
import {regainWillCounter} from './RegainWillCounter'
import {takeBackDiscardedPlace} from './TakeBackDiscardedPlace'

export const GIVE_UP = 'GiveUp'
export const giveUp = (huntedId) => ({type: GIVE_UP, huntedId})

export const GiveUp = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    for (let i = hunted.willCounters; i < 3; i++) {
      game.nextMoves.push(regainWillCounter(move.huntedId))
    }
    hunted.discardedPlaceCards.forEach(place => game.nextMoves.push(takeBackDiscardedPlace(move.huntedId, place)))
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