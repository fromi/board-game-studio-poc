import {shuffleHuntCards} from "./ShuffleHuntCards"
import {CREATURE} from "../NotAlone"

export const drawHuntCards = (numberOfCards) => ({type: 'DrawHuntCards', numberOfCards})

const execute = (game, move) => {
  for (let i = 0; i < move.numberOfCards; i++) {
    game.creature.hand.push(game.huntCardsDeck.shift())
  }
  game.nextMoves.shift()
}

export const DrawHuntCards = {
  hasPriorMove: (move, game) => move.numberOfCards > game.huntCardsDeck.length,

  getPriorMove: () => shuffleHuntCards,

  execute,

  getPlayerView: (move, playerId, game) => playerId === CREATURE ? {...move, huntCardsDrawn: game.creature.hand.slice(-move.numberOfCards)} : move,

  reportInPlayerView: (game, move, playerId) => {
    execute(game, move)
    if (playerId === CREATURE) {
      game.creature.hand.splice(-move.numberOfCards, move.numberOfCards, ...move.huntCardsDrawn)
    }
  }
}