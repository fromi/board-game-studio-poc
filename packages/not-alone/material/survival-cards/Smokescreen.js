import {EXPLORATION, SURVIVAL_CARD} from '../../NotAlone'
import {SMOKESCREEN} from '../SurvivalCards'

export const Smokescreen = {
  phase: EXPLORATION,
  playCard: game => game.pendingEffects.push({cardType: SURVIVAL_CARD, card: SMOKESCREEN}),
}
