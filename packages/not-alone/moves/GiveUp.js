import {getHunted} from '../NotAlone'
import {isExplorationMove} from '../phases/Exploration'
import {regainWillCounter} from './RegainWillCounter'
import {takeBackDiscardedPlace} from './TakeBackDiscardedPlace'
import {moveAssimilationCounter} from './MoveAssimilationCounter'

export const GIVE_UP = 'GiveUp'
export const giveUp = (huntedId) => ({type: GIVE_UP, huntedId})

export const GiveUp = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    game.nextMoves.push(regainWillCounter(move.huntedId, 3 - hunted.willCounters))
    hunted.discardedPlaceCards.forEach(place => game.nextMoves.push(takeBackDiscardedPlace(move.huntedId, place)))
    game.nextMoves.push(moveAssimilationCounter(GIVE_UP))
  },

  undoable: (move, nextMoves) => !nextMoves.some(nextMove => isExplorationMove(nextMove, move.huntedId)),

  consequences: (move, nextMoves) => {
    const nextExplorationMoveIndex = nextMoves.findIndex(nextMove => isExplorationMove(nextMove, move.huntedId))
    if (nextExplorationMoveIndex !== -1) {
      nextMoves = nextMoves.slice(0, nextExplorationMoveIndex)
    }
    const consequences = nextMoves.filter(nextMoves => nextMoves.huntedId === move.huntedId)
    consequences.push(moveAssimilationCounter(GIVE_UP))
    return consequences
  }
}