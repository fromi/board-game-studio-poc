import {ARTEMIA_TOKEN} from '../HuntTokens'
import {HUNT_CARD, HUNTING} from '../../NotAlone'
import {VIRUS} from '../HuntCards'

export const Virus = {
  phase: HUNTING,
  token: ARTEMIA_TOKEN,
  placeTokenOnAdjacentPlaces: true,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: VIRUS})
}
