import {shuffleHuntCards} from './ShuffleHuntCards'
import {CREATURE} from '../NotAlone'

export const DRAW_HUNT_CARD = 'DrawHuntCard'

export const drawHuntCard = quantity => ({type: DRAW_HUNT_CARD, quantity})

export const DrawHuntCard = {
  hasPriorMove: (game, move) => game.huntCardsDeck.length < move.quantity,

  getPriorMove: () => shuffleHuntCards,

  execute: (game, move) => {
    game.creature.hand.push(...game.huntCardsDeck.splice(0, move.quantity))
    game.nextMoves.shift()
  },

  getView: (move, playerId, game) => playerId === CREATURE ? {...move, cards: game.creature.hand.slice(-move.quantity)} : move,

  reportInView: (game, move, playerId) => {
    DrawHuntCard.execute(game, move)
    if (playerId === CREATURE) {
      game.creature.hand.splice(-move.quantity, move.quantity, ...move.cards)
    }
  }
}