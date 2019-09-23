import {huntedOwnPlace, PLACES} from "../../NotAlone";

export const Rover = {
  canUsePower: (game, hunted) => PLACES.find(place => game.reserve[place] > 0 && !huntedOwnPlace(hunted, place))
}