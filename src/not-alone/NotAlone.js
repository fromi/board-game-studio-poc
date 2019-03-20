import CHOOSE_BOARD_SIDE from "./moves/ChooseBoardSide"
import REMOVE_RANDOM_HUNT_CARD from "./moves/RemoveRandomHuntCard"

export default class NotAlone {
  boardSide
  creature
  hunted

  setup() {
    this.creature = {hand: ['Force Field', 'Despair', 'Tracking']}
    this.hunted = [{}]
  }

  getPlayers() {
    return ['Creature'].concat(this.hunted.map((hunted, index) => 'Hunted ' + (index + 1)))
  }

  getLegalMoves(playerId) {
    if (!this.boardSide) {
      if (playerId === 'Creature')
        return {[CHOOSE_BOARD_SIDE]: [1, 2]}
      else
        return {}
    } else {
      return REMOVE_RANDOM_HUNT_CARD
    }
  }
}
