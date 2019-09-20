import {markPlaceResolved, THE_BEACH} from "../material/PlaceCards";

export const PUT_MARKER_ON_BEACH = 'PutMarkerOnBeach'
export const putMarkerOnBeach = (huntedId) => ({type: PUT_MARKER_ON_BEACH, huntedId})

export const PutMarkerOnBeach = {
  execute: (game, move) => {
    game.markerCounterOnBeach = true
    markPlaceResolved(game, move.huntedId, THE_BEACH)
  }
}