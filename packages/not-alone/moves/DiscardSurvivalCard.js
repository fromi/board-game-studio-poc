import {continueGameAfterMove, getHunted} from '../NotAlone'

export const DISCARD_SURVIVAL_CARD = 'DiscardSurvivalCard'

export const discardSurvivalCard = (huntedId, card) => ({type: DISCARD_SURVIVAL_CARD, huntedId, place: card})

export const DiscardSurvivalCard = {
  execute: (game, move) => {
    const hunted = getHunted(game, move.huntedId)
    hunted.handSurvivalCards.splice(hunted.handSurvivalCards.indexOf(move.card), 1)
    game.survivalCardsDiscard.push(move.card)
    continueGameAfterMove(game, move)
  }
}