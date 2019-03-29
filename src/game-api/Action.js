let actionMap

export const getActionMap = (Game) => {
  if (!actionMap) {
    actionMap = Game.actions.reduce((map, action) => {
      map[action.constructor.name] = action
      return map
    }, {})
  }
  return actionMap
}

export const playAction = (Game, game, playerId, action, dispatch) => {
  const Action = getActionMap(Game)[action.type]
  if (Action.hasPriorAction && Action.hasPriorAction(game, action)) {
    const priorAction = Action.getPriorAction(game, action)
    playAction(Game, game, playerId, priorAction, dispatch)
  }
  action = {...action, playerId}
  if (Action.setRandomOutput) {
    Action.setRandomOutput(game, action)
  }
  dispatch(action)
}

export default class Action {
  action = {type: this.constructor.name}

  hasPriorAction = () => false
  getPriorAction = () => {
    throw new Error("You must implement getPriorAction alongside hasPriorAction")
  }

  execute = (game, action) => {
    throw new Error("You must implement function execute for action " + action.type)
  }

  getView = (action) => action

  getPlayerView = (action, playerId, game) => {
    if (action.playerId === playerId) {
      return this.getOwnView(action, game)
    } else {
      return this.getView(action)
    }
  }

  getOwnView = (action) => this.getView(action)

  getSpectatorView = (action) => this.getView(action)

  reportInPlayerView = (gameView, actionView, playerId) => {
    if (actionView.playerId === playerId) {
      this.reportInOwnView(gameView, actionView)
    } else {
      this.execute(gameView, actionView)
    }
  }

  reportInOwnView = (gameView, actionView) => this.execute(gameView, actionView)

  reportInSpectatorView = (gameView, actionView) => this.execute(gameView, actionView)
}