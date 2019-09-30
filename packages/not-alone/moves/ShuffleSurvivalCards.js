import {shuffle} from '../game-api/Random'

export const SHUFFLE_SURVIVAL_CARDS = 'ShuffleSurvivalCards'

export const shuffleSurvivalCards = {type: SHUFFLE_SURVIVAL_CARDS}

export const ShuffleSurvivalCards = {
  prepare: (move, game) => ({...move, shuffled: shuffle(game.survivalCardsDiscard)}),

  execute: (game, move) => {
    game.survivalCardsDeck.push(...move.shuffled)
    game.survivalCardsDiscard = []
  },

  getView: (move) => ({...move, shuffled: move.shuffled.map(() => ({}))})
}