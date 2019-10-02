import {EXPLORATION, getHunted, SURVIVAL_CARD} from '../../NotAlone'
import {SACRIFICE} from '../SurvivalCards'
import {discardPlaceCard} from '../../moves/DiscardPlaceCard'

export const Sacrifice = {
  phase: EXPLORATION,

  canBePlayed: (game, huntedId) => game.phase === EXPLORATION && getHunted(game, huntedId).handPlaceCards.length > 0,

  playCard: (game, huntedId) => {
    game.ongoingAction = {cardType: SURVIVAL_CARD, card: SACRIFICE, huntedId}
    game.pendingEffects.push({cardType: SURVIVAL_CARD, card: SACRIFICE})
  },

  getHuntedMoves: (game, huntedId) => {
    if (game.ongoingAction.huntedId === huntedId) {
      return getHunted(game, huntedId).handPlaceCards.map(place => discardPlaceCard(huntedId, place))
    } else {
      return []
    }
  }
}
