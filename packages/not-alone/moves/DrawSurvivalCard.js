import {getHunted} from "../NotAlone"

export const DRAW_SURVIVAL_CARD = 'DrawSurvivalCard'

export const drawSurvivalCard = (huntedId) => ({type: DRAW_SURVIVAL_CARD, huntedId})

const execute = (game, move) => {
  getHunted(game, move.huntedId).handSurvivalCards.push(game.survivalCardsDeck.shift())
  game.nextMoves.shift()
}

export const DrawSurvivalCard = {
  execute,

  getView: (move, playerId, game) => playerId === move.huntedId ? {...move, card: getHunted(game, playerId).handSurvivalCards.slice(-1)[0]} : move,

  reportInView: (game, move, playerId) => {
    execute(game, move)
    if (playerId === move.huntedId) {
      getHunted(game, playerId).handSurvivalCards.splice(-1, 1, move.card)
    }
  }
}