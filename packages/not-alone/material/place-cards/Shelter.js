import {THE_SHELTER} from '../PlaceCards'
import {continueReckoning, getCurrentHuntedId} from '../../phases/Reckoning'
import {discardSurvivalCard} from '../../moves/DiscardSurvivalCard'
import {canDrawSurvivalCard, PLACE_CARD} from '../../NotAlone'
import {DRAW_SURVIVAL_CARD, drawSurvivalCard} from '../../moves/DrawSurvivalCard'

export const Shelter = {
  canUsePower: canDrawSurvivalCard,

  usePower: (game) => {
    game.ongoingAction = {cardType: PLACE_CARD, card: THE_SHELTER}
  },

  getAutomaticMove: (game) => {
    if (!game.ongoingAction.survivalCards) {
      return drawSurvivalCard(getCurrentHuntedId(game), Math.max(2, game.survivalCardsDeck.length + game.survivalCardsDiscard.length))
    }
  },

  getHuntedMoves: (game, hunted) => {
    if (game.ongoingAction.survivalCards && hunted === getCurrentHuntedId(game)) {
      return game.ongoingAction.survivalCards.map(card => discardSurvivalCard(hunted, card))
    } else {
      return []
    }
  },

  continueGameAfterMove: (game, move) => {
    if (move.type === DRAW_SURVIVAL_CARD && move.quantity === 2) {
      game.ongoingAction.survivalCards = move.cards
    } else {
      delete game.ongoingAction
      continueReckoning(game)
    }
  }
}