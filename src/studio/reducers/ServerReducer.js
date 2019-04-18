import {CANCEL_MOVE, NEW_GAME, PLAY_MOVE} from "../StudioActions"
import produce from "immer"

export function createServerReducer(Game) {
  return (state = {}, action) => {
    switch (action.type) {
      case NEW_GAME:
        return {...state, game: action.game, moveHistory: []}
      case PLAY_MOVE:
        return produce(state, draft => {
          Game.moves[action.move.type].execute(draft.game, action.move)
          draft.moveHistory.push(action.move)
        })
      case CANCEL_MOVE:
        return produce(state, draft => {
          Game.moves[action.move.type].cancel(draft.game, action.move)
          draft.moveHistory.splice(draft.moveHistory.lastIndexOf(action.move), 1)
        })
      default:
        return state
    }
  }
}

export function automaticMovesListener(Game, store) {
  return () => {
    const move = Game.getAutomaticMove(store.getState().server.game)
    if (move) {
      store.dispatch({type: PLAY_MOVE, move})
    }
  }
}