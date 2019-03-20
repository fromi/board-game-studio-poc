import MoveRegistry from '../../game-api/MoveRegistry'
import RandomMove from "../../game-api/RandomMove"

const REMOVE_RANDOM_HUNT_CARD = 'Remove random hunt card'

class RemoveRandomHuntCard extends RandomMove {
  prepareAction(game) {
    return {card: game.creature.hand[Math.floor(Math.random() * game.creature.hand.length)]}
  }

  execute(game, action) {
    game.creature.hand.splice(game.creature.hand.indexOf(action.card), 1)
  }
}

MoveRegistry.registerMove(REMOVE_RANDOM_HUNT_CARD, RemoveRandomHuntCard)

export default REMOVE_RANDOM_HUNT_CARD
