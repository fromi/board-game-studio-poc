import {TARGET_TOKEN} from '../HuntTokens'
import {HUNT_CARD} from '../../NotAlone'
import {CLONE} from '../HuntCards'
import {HUNTING} from '../../Phases'

export const Clone = {
  phase: HUNTING,
  token: TARGET_TOKEN,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: CLONE}),
  isPlaceIneffective: (place, game) => game.huntTokensLocations[TARGET_TOKEN].includes(place)
}
