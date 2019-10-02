import {END_OF_TURN_ACTIONS} from '../../NotAlone'
import {removeMarkerFromBeach} from '../../moves/RemoveMarkerFromBeach'
import {moveRescueCounter} from '../../moves/MoveRescueCounter'

export const Amplifier = {
  phase: END_OF_TURN_ACTIONS,

  canBePlayed: game => game.phase === END_OF_TURN_ACTIONS && game.markerCounterOnBeach,

  playCard: (game, huntedId) => game.nextMoves.push(removeMarkerFromBeach(huntedId), moveRescueCounter)
}
