import Action from "../../game-api/Action"
import {hideItemsDetail} from "../../game-api/Secrets"
import {shuffle} from "../../game-api/Random"

class ShuffleHuntCards extends Action {
  setRandomOutput = (game, action) => {
    action.shuffled = shuffle(game.huntCardsDiscard)
  }

  execute = (game, action) => {
    game.huntCardsDeck.push(...action.shuffled)
    game.huntCardsDiscard = []
  }

  getView = (action) => {
    return {...action, shuffled: hideItemsDetail(action.shuffled)}
  }
}

export default new ShuffleHuntCards()