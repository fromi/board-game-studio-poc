import {TARGET_TOKEN} from '../HuntTokens'
import {HUNT_CARD, HUNTING} from '../../NotAlone'
import {MIRAGE} from '../HuntCards'

export const Mirage = {
  phase: HUNTING,
  token: TARGET_TOKEN,
  placeTokenOnAdjacentPlaces: true,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: MIRAGE}),
  isPlaceIneffective: (place, game) => game.huntTokensLocations[TARGET_TOKEN].includes(place)
}
