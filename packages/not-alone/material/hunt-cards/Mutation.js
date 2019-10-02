import {ARTEMIA_TOKEN} from '../HuntTokens'
import {HUNT_CARD, HUNTING} from '../../NotAlone'
import {MUTATION} from '../HuntCards'

export const Mutation = {
  phase: HUNTING,
  token: ARTEMIA_TOKEN,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: MUTATION})
}
