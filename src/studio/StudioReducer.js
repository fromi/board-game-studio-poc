import produce from 'immer'

const createStudioReducer = (Game) => {
  const newGame = Game.setup({numberOfPlayers: 3})
  const playerIds = Game.getPlayerIds(newGame)
  const initialState = {
    game: newGame,
    tab: playerIds[0],
    playerViews: playerIds.reduce((map, playerId) => {
      map[playerId] = Game.getPlayerView(newGame, playerId)
      return map
    }, {}),
    spectatorView: Game.getSpectatorView(newGame)
  }

  const executeGameAction = (state, action) => produce(state, draft => {
    Game.executeAction(draft.game, action)
    Game.getPlayerIds(draft.game).forEach(playerId => {
      Game.reportActionInGameView(draft.playerViews[playerId], Game.getPlayerActionView(action, playerId, draft.game))
    })
    Game.reportActionInGameView(draft.spectatorView, Game.getSpectatorActionView(action, draft.game))
  })

  return function (state, action) {
    if (!state) return initialState
    switch (action.type) {
      case 'SELECT_TAB':
        return {...state, tab: action.tab}
      default:
        return executeGameAction(state, action)
    }
  }
}

export default createStudioReducer