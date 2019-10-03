import {ARTEMIA_TOKEN} from '../HuntTokens'
import {HUNT_CARD} from '../../NotAlone'
import {MUTATION} from '../HuntCards'
import {HUNTING} from '../../Phases'

export const Mutation = {
  phase: HUNTING,
  token: ARTEMIA_TOKEN,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: MUTATION})
}
