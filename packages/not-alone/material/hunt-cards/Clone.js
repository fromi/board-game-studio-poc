import {TARGET_TOKEN} from '../HuntTokens'
import {HUNTING} from '../../NotAlone'

export const Clone = {
  phase: HUNTING,
  token: TARGET_TOKEN,
  isPlaceIneffective: (place, game) => game.huntTokensLocations[TARGET_TOKEN].includes(place)
}
