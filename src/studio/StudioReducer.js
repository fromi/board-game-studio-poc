import produce from 'immer'

const createStudioReducer = (Game, GameEngine) => {
  const newGame = Game.setup({numberOfPlayers: 3})
  const playerIds = Game.getPlayerIds(newGame)
  const initialState = {
    game: newGame,
    tab: playerIds[0],
    playerViews: playerIds.reduce((map, playerId) => {
      map[playerId] = Game.getPlayerView(newGame, playerId)
      return map
    }, {}),
    spectatorView: Game.getSpectatorView(newGame),
    pastGameActions: []
  }

  const executeGameAction = (state, action) => produce(state, draft => {
    const Action = GameEngine.getAction(action.type)
    Action.execute(draft.game, action)
    Game.getPlayerIds(draft.game).forEach(playerId => {
      Action.reportInPlayerView(draft.playerViews[playerId], Action.getPlayerView(action, playerId, draft.game), playerId)
    })
    Action.reportInSpectatorView(draft.spectatorView, Action.getSpectatorView(action, draft.game))
    draft.pastGameActions.push(action)
  })

  const cancelGameAction = (state, action) => produce(state, draft => {
    const Action = GameEngine.getAction(action.type)
    Action.cancel(draft.game, action)
    Game.getPlayerIds(draft.game).forEach(playerId => {
      Action.cancelInPlayerView(draft.playerViews[playerId], Action.getPlayerView(action, playerId, draft.game), playerId)
    })
    Action.cancelInSpectatorView(draft.spectatorView, Action.getSpectatorView(action, draft.game))
    draft.pastGameActions.splice(draft.pastGameActions.indexOf(action), 1)
  })

  return function (state, action) {
    if (!state) return initialState
    switch (action.type) {
      case 'SELECT_TAB':
        return {...state, tab: action.tab}
      case 'CANCEL_ACTION':
        return cancelGameAction(state, action.action)
      default:
        return executeGameAction(state, action)
    }
  }
}

export default createStudioReducer