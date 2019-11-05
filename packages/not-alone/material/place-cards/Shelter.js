import {THE_SHELTER} from '../PlaceCards'
import {continueReckoning, getCurrentHuntedId} from '../../phases/Reckoning'
import {discardSurvivalCard} from '../../moves/DiscardSurvivalCard'
import {canDrawSurvivalCard, getHunted, PLACE_CARD} from '../../NotAlone'
import {DRAW_SURVIVAL_CARD, drawSurvivalCard} from '../../moves/DrawSurvivalCard'

export const Shelter = {
  canUsePower: canDrawSurvivalCard,

  usePower: (game) => {
    game.ongoingAction = {cardType: PLACE_CARD, card: THE_SHELTER}
  },

  getAutomaticMove: (game) => {
    if (!game.ongoingAction.survivalCardsDrawn) {
      return drawSurvivalCard(getCurrentHuntedId(game), Math.min(2, game.survivalCardsDeck.length + game.survivalCardsDiscard.length))
    }
  },

  getHuntedMoves: (game, huntedId) => {
    if (game.ongoingAction.survivalCardsDrawn && huntedId === getCurrentHuntedId(game)) {
      return getHunted(game, huntedId).handSurvivalCards.slice(-2).map(card => discardSurvivalCard(huntedId, card))
    } else {
      return []
    }
  },

  continueGameAfterMove: (game, move) => {
    if (move.type === DRAW_SURVIVAL_CARD && move.quantity === 2) {
      game.ongoingAction.survivalCardsDrawn = true
    } else {
      delete game.ongoingAction
      continueReckoning(game)
    }
  }
}