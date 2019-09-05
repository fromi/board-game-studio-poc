import {shuffleHuntCards} from "./ShuffleHuntCards"
import {CREATURE} from "../NotAlone"

export const DRAW_HUNT_CARD = 'DrawHuntCard'

export const drawHuntCard = {type: DRAW_HUNT_CARD}

const execute = (game) => {
  game.creature.hand.push(game.huntCardsDeck.shift())
  game.nextMoves.shift()
}

export const DrawHuntCard = {
  hasPriorMove: (game) => !game.huntCardsDeck.length,

  getPriorMove: () => shuffleHuntCards,

  execute,

  getView: (move, playerId, game) => playerId === CREATURE ? {...move, card: game.creature.hand.slice(-1)[0]} : move,

  reportInView: (game, move, playerId) => {
    execute(game, move)
    if (playerId === CREATURE) {
      game.creature.hand.splice(-1, 1, move.card)
    }
  }
}