import {hideItemsDetail} from "../../game-api/Secrets"
import {shuffle} from "../../game-api/Random"
import RandomAction from "../../game-api/RandomAction"

class ShuffleHuntCards extends RandomAction {
  prepare = (action, playerId, game) => ({...action, shuffled: shuffle(game.huntCardsDiscard)})

  execute = (game, action) => {
    game.huntCardsDeck.push(...action.shuffled)
    game.huntCardsDiscard = []
  }

  getView = (action) => {
    return {...action, shuffled: hideItemsDetail(action.shuffled)}
  }
}

export default new ShuffleHuntCards()