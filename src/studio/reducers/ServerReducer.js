import {CANCEL_ACTION, NEW_GAME, PLAY_ACTION} from "../StudioActions"
import produce from "immer"

export function createServerReducer(Game) {
  return (state = {}, action) => {
    switch (action.type) {
      case NEW_GAME:
        return {...state, game: action.game, moveHistory: []}
      case PLAY_ACTION:
        return produce(state, draft => {
          Game.actions[action.action.type].execute(draft.game, action.action)
          draft.moveHistory.push(action.action)
        })
      case CANCEL_ACTION:
        return produce(state, draft => {
          Game.actions[action.action.type].cancel(draft.game, action.action)
          draft.moveHistory.splice(draft.moveHistory.lastIndexOf(action), 1)
        })
      default:
        return state
    }
  }
}

export function automaticActionDispatchListener(Game, store) {
  return () => {
    const action = Game.getAutomaticAction(store.getState().server.game)
    if (action) {
      store.dispatch({type: PLAY_ACTION, action})
    }
  }
}