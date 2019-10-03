import {SURVIVAL_CARD} from '../../NotAlone'
import {DETECTOR} from '../SurvivalCards'
import {ARTEMIA_TOKEN} from '../HuntTokens'
import {RECKONING} from '../../Phases'

export const Detector = {
  phase: RECKONING,

  canBePlayed: game => game.phase === RECKONING && game.huntTokensLocations[ARTEMIA_TOKEN].length > 0,

  playCard: (game, huntedId) => game.pendingEffects.push({cardType: SURVIVAL_CARD, card: DETECTOR, huntedId}),
}

export function huntedAvoidsArtemiaTokenEffect(game, huntedId) {
  return game.pendingEffects.some(effect => effect.card === DETECTOR && effect.huntedId === huntedId)
}