import {EXPLORATION, getHunted, SURVIVAL_CARD} from '../../NotAlone'
import {SIXTH_SENSE} from '../SurvivalCards'
import {takeBackDiscardedPlace} from '../../moves/TakeBackDiscardedPlace'

export const SixthSense = {
  phase: EXPLORATION,

  canBePlayed: (game, huntedId) => game.phase === EXPLORATION && getHunted(game, huntedId).discardedPlaceCards.length > 0,

  playCard: (game, huntedId) => game.ongoingAction = {cardType: SURVIVAL_CARD, card: SIXTH_SENSE, huntedId, cardsLeft: 2},

  getHuntedMoves: (game, huntedId) => {
    if (game.ongoingAction.huntedId === huntedId) {
      return getHunted(game, huntedId).discardedPlaceCards.map(place => takeBackDiscardedPlace(huntedId, place))
    } else {
      return []
    }
  },

  continueGameAfterMove: game => {
    if (game.ongoingAction.cardsLeft > 1 && getHunted(game.ongoingAction.huntedId).discardedPlaceCards.length > 0) {
      game.ongoingAction.cardsLeft--
    } else {
      delete game.ongoingAction
    }
  }
}
