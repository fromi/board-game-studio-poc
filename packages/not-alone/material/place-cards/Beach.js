import {putMarkerOnBeach} from "../../moves/PutMarkerOnBeach";
import {removeMarkerFromBeach} from "../../moves/RemoveMarkerFromBeach";

export const Beach = {
  getPowerMoves: (game, huntedId) => [game.markerCounterOnBeach ? removeMarkerFromBeach(huntedId) : putMarkerOnBeach(huntedId)]
}