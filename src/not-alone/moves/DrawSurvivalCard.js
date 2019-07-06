import {getHunted} from "../NotAlone"

export const DRAW_SURVIVAL_CARD = 'DrawSurvivalCard'

export const drawSurvivalCard = (playerId) => ({type: DRAW_SURVIVAL_CARD, playerId})

const execute = (game, move) => {
  getHunted(game, move.playerId).handSurvivalCards.push(game.survivalCardsDeck.shift())
  game.nextMoves.shift()
}

export const DrawSurvivalCard = {
  execute,

  getOwnView: (move, game) => ({...move, card: getHunted(game, move.playerId).handSurvivalCards.slice(-1)[0]}),

  reportInOwnView: (game, move) => {
    execute(game, move)
    getHunted(game, move.playerId).handSurvivalCards.splice(-1, 1, move.card)
  }
}