import {putMarkerOnBeach} from "../../moves/PutMarkerOnBeach";
import {removeMarkerFromBeach} from "../../moves/RemoveMarkerFromBeach";

export const Beach = {
  canUsePower: (game) => !game.beachUsed,

  usePower: (game, huntedId) => {
    if (!game.markerCounterOnBeach) {
      game.nextMoves.push(putMarkerOnBeach(huntedId))
    } else {
      game.nextMoves.push(removeMarkerFromBeach(huntedId))
    }
  }
}