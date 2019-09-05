import {getRandom} from "../game-api/Random"

export const strikeBack = {type: 'StrikeBack'}

export const StrikeBack = {
  prepare: (move, game) => ({...move, cards: game.creature.hand.length > 2 ? getRandom(game.creature.hand, 2) : game.creature.hand}),

  execute: (game, move) => move.cards.forEach((card) => {
    game.creature.hand.splice(game.creature.hand.indexOf(card), 1)
    game.huntCardsDeck.push(card)
  })
}