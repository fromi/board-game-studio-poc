import {createStore} from "redux"
import createStudioReducer from "../studio/StudioReducer"

export default class GameEngine {
  constructor(Game) {
    this.getPlayerIds = Game.getPlayerIds
    this.getMandatoryActions = Game.getMandatoryActions
    this.getAutomaticAction = Game.getAutomaticAction
    this.actions = Game.actions.reduce((map, action) => {
      map[action.constructor.name] = action
      return map
    }, {})
    this.store = createStore(createStudioReducer(Game, this))
    this.store.subscribe(this.playAutomaticAction)
  }

  getAction = (type) => {
    const Action = this.actions[type]
    if (!Action) throw new Error("This action is not declared in the game actions:" + type)
    return Action
  }

  playAction = (action, game, playerId) => {
    const Action = this.getAction(action.type)
    if (Action.hasPriorAction(action, game, playerId)) {
      const priorAction = Action.getPriorAction(game, action)
      this.playAction(priorAction, game, playerId)
    }
    this.store.dispatch(Action.prepare(action, game, playerId))
  }

  playAutomaticAction = () => {
    const game = this.store.getState().game
    const automaticAction = this.getAutomaticAction(game)
    if (automaticAction) {
      this.playAction(automaticAction, game)
    }
  }
}