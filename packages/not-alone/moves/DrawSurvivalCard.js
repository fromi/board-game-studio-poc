import {getHunted} from '../NotAlone'
import {shuffleSurvivalCards} from './ShuffleSurvivalCards'
import {THE_SHELTER, THE_SOURCE} from '../material/PlaceCards'
import {continueReckoning} from '../phases/Reckoning'

export const DRAW_SURVIVAL_CARD = 'DrawSurvivalCard'

export const drawSurvivalCard = (huntedId) => ({type: DRAW_SURVIVAL_CARD, huntedId})

export const DrawSurvivalCard = {
  hasPriorMove: (game) => !game.survivalCardsDeck.length,

  getPriorMove: () => shuffleSurvivalCards,

  execute: (game, move) => {
    const survivalCard = game.survivalCardsDeck.shift()
    getHunted(game, move.huntedId).handSurvivalCards.push(survivalCard)
    game.nextMoves.shift()
    if (game.ongoingAction) {
      if (game.ongoingAction.card === THE_SHELTER) {
        game.ongoingAction.survivalCards.push(survivalCard)
      } else if (game.ongoingAction.card === THE_SOURCE) {
        continueReckoning(game)
      }
    }
  },

  getView: (move, playerId, game) => playerId === move.huntedId ? {...move, card: getHunted(game, playerId).handSurvivalCards.slice(-1)[0]} : move,

  reportInView: (game, move, playerId) => {
    DrawSurvivalCard.execute(game, move)
    if (playerId === move.huntedId) {
      getHunted(game, playerId).handSurvivalCards.splice(-1, 1, move.card)
    }
  }
}