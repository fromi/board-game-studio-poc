import {getRandom} from '../game-api/Random'
import {CREATURE} from '../NotAlone'

const PUT_RANDOM_HUNT_CARD_UNDER_DECK = 'PutRandomHuntCardUnderDeck'

export const putRandomHuntCardUnderDeck = {type: PUT_RANDOM_HUNT_CARD_UNDER_DECK}

export const PutRandomHuntCardUnderDeck = {
  prepare: (move, game) => ({...move, card: getRandom(game.creature.hand)}),

  execute: (game, move) => {
    game.creature.hand.splice(game.creature.hand.indexOf(move.card), 1)
    game.huntCardsDeck.push(move.card)
  },

  getView: (move, playerId) => playerId === CREATURE ? move : {...move, card: {}}
}