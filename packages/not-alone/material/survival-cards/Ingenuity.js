import {putMarkerOnBeach} from '../../moves/PutMarkerOnBeach'
import {EXPLORATION} from '../../Phases'

export const Ingenuity = {
  phase: EXPLORATION,

  canBePlayed: game => game.phase === EXPLORATION && !game.markerCounterOnBeach,

  playCard: (game, huntedId) => game.nextMoves.push(putMarkerOnBeach(huntedId))
}
