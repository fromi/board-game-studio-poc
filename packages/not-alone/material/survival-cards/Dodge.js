import {RECKONING, SURVIVAL_CARD} from '../../NotAlone'
import {DODGE} from '../SurvivalCards'

export const Dodge = {
  phase: RECKONING,

  playCard: (game, huntedId) => game.pendingEffects.push({cardType: SURVIVAL_CARD, card: DODGE, huntedId}),
}

export function huntedAvoidsCreatureTokenEffect(game, huntedId) {
  return game.pendingEffects.some(effect => effect.card === DODGE && effect.huntedId === huntedId)
}