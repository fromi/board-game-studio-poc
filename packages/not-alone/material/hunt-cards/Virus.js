import {ARTEMIA_TOKEN} from '../HuntTokens'
import {HUNT_CARD} from '../../NotAlone'
import {VIRUS} from '../HuntCards'
import {HUNTING} from '../../Phases'

export const Virus = {
  phase: HUNTING,
  token: ARTEMIA_TOKEN,
  placeTokenOnAdjacentPlaces: true,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: VIRUS})
}
