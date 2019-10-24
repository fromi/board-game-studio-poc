import {continueGameAfterMove, getHunted} from '../NotAlone'
import {shuffleSurvivalCards} from './ShuffleSurvivalCards'

export const DRAW_SURVIVAL_CARD = 'DrawSurvivalCard'

export const drawSurvivalCard = (huntedId, quantity) => ({type: DRAW_SURVIVAL_CARD, huntedId, quantity})

export const DrawSurvivalCard = {
  hasPriorMove: (game, move) => game.survivalCardsDeck.length < move.quantity,

  getPriorMove: () => shuffleSurvivalCards,

  execute: (game, move) => {
    getHunted(game, move.huntedId).handSurvivalCards.push(...game.survivalCardsDeck.splice(0, move.quantity))
    continueGameAfterMove(game, move)
  },

  getView: (move, playerId, game) => playerId === move.huntedId ? {...move, cards: getHunted(game, playerId).handSurvivalCards.slice(-move.quantity)} : move,

  reportInView: (game, move, playerId) => {
    DrawSurvivalCard.execute(game, move)
    if (playerId === move.huntedId) {
      getHunted(game, playerId).handSurvivalCards.splice(-move.quantity, move.quantity, ...move.cards)
    }
  }
}