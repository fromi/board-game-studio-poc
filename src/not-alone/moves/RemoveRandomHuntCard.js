import MoveRegistry from '../../game-api/MoveRegistry'
import TakeRandomItem from "../../game-api/TakeRandomItem"

const REMOVE_RANDOM_HUNT_CARD = 'Remove random hunt card'

class RemoveRandomHuntCard extends TakeRandomItem {
  prepareAction(game) {
    return this.takeRandomItemFrom(game.creature.hand)
  }

  execute(game, action) {
    game.creature.hand.splice(game.creature.hand.indexOf(action.data), 1)
  }
}

MoveRegistry.registerMove(REMOVE_RANDOM_HUNT_CARD, RemoveRandomHuntCard)

export default REMOVE_RANDOM_HUNT_CARD
