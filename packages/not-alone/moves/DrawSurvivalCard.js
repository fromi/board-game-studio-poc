import {continueGameAfterMove, getHunted} from '../NotAlone'
import {shuffleSurvivalCards} from './ShuffleSurvivalCards'

export const DRAW_SURVIVAL_CARD = 'DrawSurvivalCard'

export const drawSurvivalCard = (huntedId) => ({type: DRAW_SURVIVAL_CARD, huntedId})

export const DrawSurvivalCard = {
  hasPriorMove: (game) => !game.survivalCardsDeck.length,

  getPriorMove: () => shuffleSurvivalCards,

  execute: (game, move) => {
    const survivalCard = game.survivalCardsDeck.shift()
    getHunted(game, move.huntedId).handSurvivalCards.push(survivalCard)
    continueGameAfterMove(game, move)
  },

  getView: (move, playerId, game) => playerId === move.huntedId ? {...move, card: getHunted(game, playerId).handSurvivalCards.slice(-1)[0]} : move,

  reportInView: (game, move, playerId) => {
    DrawSurvivalCard.execute(game, move)
    if (playerId === move.huntedId) {
      getHunted(game, playerId).handSurvivalCards.splice(-1, 1, move.card)
    }
  }
}