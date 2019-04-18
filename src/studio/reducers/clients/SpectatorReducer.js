import {CANCEL_MOVE, NEW_GAME, PLAY_MOVE} from "../../StudioActions"
import produce from "immer"

function getMoveView(Move, move, game) {
  if (Move.getSpectatorView) {
    return Move.getSpectatorView(move, game)
  } else if (Move.getOthersView) {
    return Move.getOthersView(move, game)
  } else if (Move.getView) {
    return Move.getView(move, game)
  } else {
    return move
  }
}

function reportMove(Move, game, move) {
  move = getMoveView(Move, move, game)
  if (Move.reportInSpectatorView) {
    Move.reportInSpectatorView(game, move)
  } else if (Move.reportInView) {
    Move.reportInView(game, move)
  } else {
    Move.execute(game, move)
  }
}

function cancelMove(Move, game, move) {
  move = getMoveView(Move, move, game)
  if (Move.cancelInSpectatorView) {
    Move.cancelInSpectatorView(game, move)
  } else if (Move.cancelInView) {
    Move.cancelInView(game, move)
  } else {
    Move.cancel(game, move)
  }
}

export const createSpectatorReducer = Game => (state = {}, action) => {
  switch (action.type) {
    case NEW_GAME:
      return Game.getSpectatorView(action.game)
    case PLAY_MOVE:
      return produce(state, draft => reportMove(Game.moves[action.move.type], draft, action.move))
    case CANCEL_MOVE:
      return produce(state, draft => cancelMove(Game.moves[action.move.type], draft, action.move))
    default:
      return state;
  }
}