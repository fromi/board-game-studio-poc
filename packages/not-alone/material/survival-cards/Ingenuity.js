import {EXPLORATION} from '../../NotAlone'
import {putMarkerOnBeach} from '../../moves/PutMarkerOnBeach'

export const Ingenuity = {
  phase: EXPLORATION,

  canBePlayed: game => game.phase === EXPLORATION && !game.markerCounterOnBeach,

  playCard: (game, huntedId) => game.nextMoves.push(putMarkerOnBeach(huntedId))
}
