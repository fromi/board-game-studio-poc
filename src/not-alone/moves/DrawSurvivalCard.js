import {getHunted} from "../NotAlone"

export const drawSurvivalCard = (playerId) => ({type: 'DrawSurvivalCard', playerId})

const execute = (game, move) => {
  getHunted(game, move.playerId).handSurvivalCards.push(game.survivalCardsDeck.shift())
  game.nextMoves.shift()
}

export const DrawSurvivalCard = {
  execute,

  getOwnView: (move, game) => ({...move, survivalCardDrawn: getHunted(game, move.playerId).handSurvivalCards.slice(-1)[0]}),

  reportInOwnView: (game, move) => {
    execute(game, move)
    getHunted(game, move.playerId).handSurvivalCards.splice(-1, 1, move.survivalCardDrawn)
  }
}