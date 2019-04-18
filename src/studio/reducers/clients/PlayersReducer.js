import {CANCEL_ACTION, NEW_GAME, PLAY_ACTION} from "../../StudioActions"
import produce from "immer"

function reportAction(Game, playerId, game, action) {
  const Action = Game.actions[action.type]
  Action.reportInPlayerView(game, Action.getPlayerView(action, playerId, game), playerId)
}

function cancelAction(Game, playerId, game, action) {
  const Action = Game.actions[action.type]
  Action.cancelInPlayerView(game, Action.getPlayerView(action, playerId, game), playerId)
}

export const createPlayersReducer = Game => (state = {}, action) => {
  switch (action.type) {
    case NEW_GAME:
      return Game.getPlayerIds(action.game).reduce((map, playerId) => {
        map[playerId] = Game.getPlayerView(action.game, playerId)
        return map
      }, {})
    case PLAY_ACTION:
      return produce(state, draft => Object.keys(state).forEach(playerId => reportAction(Game, playerId, draft[playerId], action.action)))
    case CANCEL_ACTION:
      return produce(state, draft => Object.keys(state).forEach(playerId => cancelAction(Game, playerId, draft[playerId], action.action)))
    default:
      return state;
  }
}