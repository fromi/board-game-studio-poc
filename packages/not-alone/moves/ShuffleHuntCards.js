import {shuffle} from '../game-api/Random'

export const SHUFFLE_HUNT_CARDS = 'ShuffleHuntCards'

export const shuffleHuntCards = {type: SHUFFLE_HUNT_CARDS}

export const ShuffleHuntCards = {
  prepare: (move, game) => ({...move, shuffled: shuffle(game.huntCardsDiscard)}),

  execute: (game, move) => {
    game.huntCardsDeck.push(...move.shuffled)
    game.huntCardsDiscard = []
  },

  getView: (move) => ({...move, shuffled: move.shuffled.map(() => ({}))})
}