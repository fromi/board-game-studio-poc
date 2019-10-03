import {SURVIVAL_CARD} from '../../NotAlone'
import {SMOKESCREEN} from '../SurvivalCards'
import {EXPLORATION} from '../../Phases'

export const Smokescreen = {
  phase: EXPLORATION,
  playCard: game => game.pendingEffects.push({cardType: SURVIVAL_CARD, card: SMOKESCREEN}),
}
