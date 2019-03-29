import {createStore} from "redux"
import createStudioReducer from "../studio/StudioReducer"

export default class GameEngine {
  constructor(Game) {
    this.getPlayerIds = Game.getPlayerIds
    this.getLegalActions = Game.getLegalActions
    this.actions = Game.actions.reduce((map, action) => {
      map[action.constructor.name] = action
      return map
    }, {})
    this.store = createStore(createStudioReducer(Game, this))
  }

  playAction = (game, playerId, action) => {
    const Action = this.actions[action.type]
    if (Action.hasPriorAction(action, game, playerId)) {
      const priorAction = Action.getPriorAction(game, action)
      this.playAction(game, playerId, priorAction)
    }
    this.store.dispatch(Action.prepare(action, playerId, game))
  }
}