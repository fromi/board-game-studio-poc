import {THE_SHELTER} from '../PlaceCards'
import {continueReckoning, getCurrentHuntedId} from '../../phases/Reckoning'
import {discardSurvivalCard} from '../../moves/DiscardSurvivalCard'
import {canDrawSurvivalCard, PLACE_CARD} from '../../NotAlone'
import {DRAW_SURVIVAL_CARD, drawSurvivalCard} from '../../moves/DrawSurvivalCard'

export const Shelter = {
  canUsePower: canDrawSurvivalCard,

  usePower: (game) => {
    game.ongoingAction = {cardType: PLACE_CARD, card: THE_SHELTER, survivalCards: []}
  },

  getAutomaticMove: (game) => {
    if (game.ongoingAction.survivalCards.length < 2) {
      return drawSurvivalCard(getCurrentHuntedId(game))
    }
  },

  getHuntedMoves: (game, hunted) => {
    if (game.ongoingAction.survivalCards === 2 && hunted === getCurrentHuntedId(game)) {
      return game.ongoingAction.survivalCards.map(card => discardSurvivalCard(hunted, card))
    } else {
      return []
    }
  },

  continueGameAfterMove: (game, move) => {
    if (move.type === DRAW_SURVIVAL_CARD) {
      game.ongoingAction.survivalCards.push(move.card)
    } else {
      delete game.ongoingAction
      continueReckoning(game)
    }
  }
}