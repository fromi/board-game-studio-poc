import Action from "../../game-api/Action"
import {getRandom} from "../../game-api/Random"

class StrikeBack extends Action {
  prepare = (action, playerId, game) => ({
    ...action, playerId, cards: game.creature.hand.length > 2 ? getRandom(game.creature.hand, 2) : game.creature.hand
  })

  execute = (game, action) => {
    action.cards.forEach((card) => {
      game.creature.hand.splice(game.creature.hand.indexOf(card), 1)
      game.huntCardsDeck.push(card)
    })
  }
}

export default new StrikeBack()