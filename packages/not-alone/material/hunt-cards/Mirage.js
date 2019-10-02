import {TARGET_TOKEN} from '../HuntTokens'
import {HUNTING} from '../../NotAlone'

export const Mirage = {
  phase: HUNTING,
  token: TARGET_TOKEN,
  placeTokenOnAdjacentPlaces: true,
  isPlaceIneffective: (place, game) => game.huntTokensLocations[TARGET_TOKEN].includes(place)
}
