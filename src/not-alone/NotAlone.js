import {getRandom, shuffle} from "../game-api/Random"
import SurvivalCards, {STRIKE_BACK} from "./material/SurvivalCards"
import HuntCards from "./material/HuntCards"
import {createAction, createActions} from "../game-api/Action"

const CREATURE = 'Creature',
  HUNTED_PREFIX = 'Hunted ',
  CHOOSE_BOARD_SIDE = 'Choose board side',
  DRAW_HUNT_CARD = 'Draw Hunt card',
  DRAW_SURVIVAL_CARD = 'Draw Survival card'

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
    this.boardSide = undefined
    this.creature = {hand: [], pendingActions: [createActions(CHOOSE_BOARD_SIDE, [1, 2])]}
    this.hunted = []
    for (let playerNumber = 1; playerNumber < options.numberOfPlayers; playerNumber++) {
      this.hunted.push({willCounters: 3, handPlaceCards: [1, 2, 3, 4, 5], handSurvivalCards: [], pendingActions: []})
    }
    this.assimilationCounter = 5 + options.numberOfPlayers
    this.rescueCounter = 11 + options.numberOfPlayers
    this.markerCounterOnBeach = false
    const reserveSize = options.numberOfPlayers < 3 ? 1 : options.numberOfPlayers < 5 ? 2 : 3
    this.reserve = {6: reserveSize, 7: reserveSize, 8: reserveSize, 9: reserveSize, 10: reserveSize}
    this.survivalCardsDeck = shuffle(SurvivalCards)
    this.huntCardsDeck = shuffle(HuntCards)
    console.log(this.hunted[0] === this.hunted[1])
  }

  getPlayerIds() {
    return [CREATURE].concat(this.hunted.map((hunted, index) => HUNTED_PREFIX + (index + 1)))
  }

  getLegalActions(playerId) {
    const player = this.getPlayer(playerId)
    if (player.pendingActions.length > 0) {
      return player.pendingActions[0]
    }
    return [createAction(STRIKE_BACK)]
  }

  getPlayer(id) {
    if (id === CREATURE) {
      return this.creature
    } else {
      return this.hunted[parseInt(id.slice(HUNTED_PREFIX.length)) - 1]
    }
  }

  prepareAction(action) {
    if (action.type === STRIKE_BACK)
      action.data = getRandom(this.creature.hand, 2)
  }

  executeAction(action) {
    switch (action.type) {
      case CHOOSE_BOARD_SIDE:
        this.chooseBoardSide(action.data)
        break;
      case DRAW_HUNT_CARD:
        this.drawHuntCard(action.data)
        break;
      case DRAW_SURVIVAL_CARD:
        this.drawSurvivalCard(this.getPlayer(action.player))
        break;
      case STRIKE_BACK:
        this.strikeBack(action.data)
        break;
      default:
        throw new Error('This action is not implemented: ' + action.type)
    }
  }

  chooseBoardSide(side) {
    this.boardSide = side
    this.creature.pendingActions.shift()
    this.creature.pendingActions.push([createAction(DRAW_HUNT_CARD, 3)])
    this.hunted.forEach((hunted) => hunted.pendingActions.push([createAction(DRAW_SURVIVAL_CARD)]))
  }

  drawHuntCard(quantity) {
    for (let i = 0; i < quantity; i++) {
      this.creature.hand.push(this.huntCardsDeck.shift())
      this.creature.pendingActions.shift()
    }
  }

  drawSurvivalCard(hunted) {
    hunted.handSurvivalCards.push(this.survivalCardsDeck.shift())
    hunted.pendingActions.shift()
  }

  strikeBack(cards) {
    cards.forEach((card) => {
      this.creature.hand.splice(this.creature.hand.indexOf(card), 1)
      this.huntCardsDeck.push(card)
    })
  }
}
