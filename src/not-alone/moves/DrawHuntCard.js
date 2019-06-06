import {shuffleHuntCards} from "./ShuffleHuntCards"
import {CREATURE} from "../NotAlone"

export const drawHuntCard = {type: 'DrawHuntCard'}

const execute = (game) => {
  game.creature.hand.push(game.huntCardsDeck.shift())
  game.nextMoves.shift()
}

export const DrawHuntCard = {
  hasPriorMove: (game) => !game.huntCardsDeck.length,

  getPriorMove: () => shuffleHuntCards,

  execute,

  getPlayerView: (move, playerId, game) => playerId === CREATURE ? {...move, huntCardDrawn: game.creature.hand.slice(-1)[0]} : move,

  reportInPlayerView: (game, move, playerId) => {
    execute(game, move)
    if (playerId === CREATURE) {
      game.creature.hand.splice(-1, 1, move.huntCardDrawn)
    }
  }
}