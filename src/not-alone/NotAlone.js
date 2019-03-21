import CHOOSE_BOARD_SIDE from "./moves/ChooseBoardSide"
import REMOVE_RANDOM_HUNT_CARD from "./moves/RemoveRandomHuntCard"
import Deck from "../game-api/Deck"
import SurvivalCards from "./material/SurvivalCards"
import HuntCards from "./material/HuntCards"

export default class NotAlone {
  boardSide
  creature
  hunted
  assimilationCounter
  rescueCounter
  markerCounterOnBeach
  reserve
  survivalCardsDeck
  huntCardsDeck

  setup(options) {
    this.creature = {hand: []}
    this.hunted = Array(options.numberOfPlayers - 1).fill({willCounters: 3, handPlaceCards: [1, 2, 3, 4, 5], handSurvivalCards: []})
    this.assimilationCounter = 5 + options.numberOfPlayers
    this.rescueCounter = 11 + options.numberOfPlayers
    this.markerCounterOnBeach = false
    let reserveSize = options.numberOfPlayers < 3 ? 1 : options.numberOfPlayers < 5 ? 2 : 3
    this.reserve = {6: reserveSize, 7: reserveSize, 8: reserveSize, 9: reserveSize, 10: reserveSize}
    this.survivalCardsDeck = Deck.shuffle(SurvivalCards)
    this.huntCardsDeck = Deck.shuffle(HuntCards)
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
