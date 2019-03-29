import Action from "../../game-api/Action"
import ShuffleHuntCards from "./ShuffleHuntCards"

class DrawHuntCards extends Action {
  hasPriorAction = (action, game) => action.numberOfCards > game.huntCardsDeck.length
  getPriorAction = () => ShuffleHuntCards.action

  execute = (game, action) => {
    for (let i = 0; i < action.numberOfCards; i++) {
      game.creature.hand.push(game.huntCardsDeck.shift())
    }
    game.creature.pendingActions.shift()
  }

  getOwnView = (action, game) => ({...action, huntCardsDrawn: game.creature.hand.slice(-action.numberOfCards)})

  reportInOwnView = (game, action) => {
    this.execute(game, action)
    game.creature.hand.splice(-action.numberOfCards, action.numberOfCards, ...action.huntCardsDrawn)
  }
}

export default new DrawHuntCards()