import Action from "../../game-api/Action"
import ShuffleHuntCards from "./ShuffleHuntCards"
import {CREATURE} from "../NotAlone"

class DrawHuntCards extends Action {
  hasPriorAction = (action, game) => action.numberOfCards > game.huntCardsDeck.length
  getPriorAction = () => ShuffleHuntCards.action

  execute = (game, action) => {
    for (let i = 0; i < action.numberOfCards; i++) {
      game.creature.hand.push(game.huntCardsDeck.shift())
    }
    game.pendingActions.shift()
  }

  getPlayerView = (action, playerId, game) => {
    if (playerId === CREATURE) {
      return {...action, huntCardsDrawn: game.creature.hand.slice(-action.numberOfCards)}
    } else {
      return action
    }
  }

  reportInPlayerView = (gameView, actionView, playerId) => {
    this.execute(gameView, actionView)
    if (playerId === CREATURE) {
      gameView.creature.hand.splice(-actionView.numberOfCards, actionView.numberOfCards, ...actionView.huntCardsDrawn)
    }
  }
}

export default new DrawHuntCards()