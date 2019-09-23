import {PLACES} from "../../NotAlone";

export const Rover = {
  canUsePower: (game, hunted) => PLACES.find(place => game.reserve[place] > 0 && !huntedOwnPlace(hunted, place))
}

function huntedOwnPlace(hunted, place) {
  return hunted.handPlaceCards.includes(place) || hunted.discardedPlaceCards.includes(place) || hunted.playedPlaceCards.includes(place)
}