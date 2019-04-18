import {hideItemsDetail} from "../../game-api/Secrets"
import {shuffle} from "../../game-api/Random"

export const shuffleHuntCards = {type: 'ShuffleHuntCards'}

export const ShuffleHuntCards = {
  prepare: (move, game) => ({...move, shuffled: shuffle(game.huntCardsDiscard)}),

  execute: (game, move) => {
    game.huntCardsDeck.push(...move.shuffled)
    game.huntCardsDiscard = []
  },

  getView: (move) => ({...move, shuffled: hideItemsDetail(move.shuffled)})
}