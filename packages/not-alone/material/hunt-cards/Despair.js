import {ARTEMIA_TOKEN} from '../HuntTokens'
import {EXPLORATION, HUNT_CARD} from '../../NotAlone'
import {DESPAIR} from '../HuntCards'

export const Despair = {
  phase: EXPLORATION,
  token: ARTEMIA_TOKEN,
  playCard: game => game.pendingEffects.push({cardType: HUNT_CARD, card: DESPAIR})
}
