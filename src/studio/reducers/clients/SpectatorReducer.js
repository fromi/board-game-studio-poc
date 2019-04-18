import {CANCEL_ACTION, NEW_GAME, PLAY_ACTION} from "../../StudioActions"
import produce from "immer"

function reportAction(Game, game, action) {
  const Action = Game.actions[action.type]
  Action.reportInSpectatorView(game, Action.getSpectatorView(action, game))
}

function cancelAction(Game, game, action) {
  const Action = Game.actions[action.type]
  Action.reportInSpectatorView(game, Action.getSpectatorView(action, game))
}

export const createSpectatorReducer = Game => (state = {}, action) => {
  switch (action.type) {
    case NEW_GAME:
      return Game.getSpectatorView(action.game)
    case PLAY_ACTION:
      return produce(state, draft => reportAction(Game, draft, action.action))
    case CANCEL_ACTION:
      return produce(state, draft => cancelAction(Game, draft, action.action))
    default:
      return state;
  }
}