import {markPlaceResolved, placeRule} from "../material/PlaceCards";

export const USE_PLACE_POWER = 'UsePlacePower'
export const usePlacePower = (place, huntedId) => ({type: USE_PLACE_POWER, place, huntedId})

export const UsePlacePower = {
  execute: (game, move) => {
    const Place = placeRule(move.place)
    Place.usePower(game, move.huntedId)
    markPlaceResolved(game, move.huntedId, move.place)
  }
}