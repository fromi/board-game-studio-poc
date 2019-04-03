export default class Action {
  action = {type: this.constructor.name}

  hasPriorAction = () => false
  getPriorAction = () => {
    throw new Error("You must implement getPriorAction alongside hasPriorAction")
  }

  prepare = (action, game, playerId) => playerId ? ({...action, playerId}) : action

  execute = (game, action) => {
    throw new Error("You must implement function execute for action " + action.type)
  }

  cancelable = () => false

  cancel = (game, action) => {
    throw new Error("You must implement function cancel for cancelable action " + action.type)
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

  cancelInPlayerView = (gameView, actionView, playerId) => {
    if (actionView.playerId === playerId) {
      this.cancelInOwnView(gameView, actionView)
    } else {
      this.cancel(gameView, actionView)
    }
  }

  cancelInOwnView = (gameView, actionView) => this.cancel(gameView, actionView)

  cancelInSpectatorView = (gameView, actionView) => this.cancel(gameView, actionView)
}
