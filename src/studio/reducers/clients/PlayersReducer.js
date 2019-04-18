import {CANCEL_MOVE, NEW_GAME, PLAY_MOVE} from "../../StudioActions"
import produce from "immer"

function getMoveView(Move, move, playerId, game) {
  if (Move.getOwnView && move.playerId === playerId) {
    return Move.getOwnView(move, game)
  } else if (Move.getOthersView && move.playerId !== playerId) {
    return Move.getOthersView(move, game)
  } else if (Move.getPlayerView) {
    return Move.getPlayerView(move, playerId, game)
  } else if (Move.getView) {
    return Move.getView(move, game)
  } else {
    return move
  }
}

function reportMove(Move, playerId, game, move) {
  move = getMoveView(Move, move, playerId, game)
  if (Move.reportInOwnView && move.playerId === playerId) {
    Move.reportInOwnView(game, move)
  } else if (Move.reportInPlayerView) {
    Move.reportInPlayerView(game, move, playerId)
  } else if (Move.reportInView) {
    Move.reportInView(game, move)
  } else {
    Move.execute(game, move)
  }
}

function cancelMove(Move, playerId, game, move) {
  move = getMoveView(Move, move, playerId, game)
  if (Move.cancelInOwnView && move.playerId === playerId) {
    Move.cancelInOwnView(game, move)
  } else if (Move.cancelInPlayerView) {
    Move.cancelInPlayerView(game, move, playerId)
  } else if (Move.cancelInView) {
    Move.cancelInView(game, move)
  } else {
    Move.cancel(game, move)
  }
}

export const createPlayersReducer = Game => (state = {}, action) => {
  switch (action.type) {
    case NEW_GAME:
      return Game.getPlayerIds(action.game).reduce((map, playerId) => {
        map[playerId] = Game.getPlayerView(action.game, playerId)
        return map
      }, {})
    case PLAY_MOVE:
      return produce(state, draft => Object.keys(state).forEach(playerId => reportMove(Game.moves[action.move.type], playerId, draft[playerId], action.move)))
    case CANCEL_MOVE:
      return produce(state, draft => Object.keys(state).forEach(playerId => cancelMove(Game.moves[action.move.type], playerId, draft[playerId], action.move)))
    default:
      return state;
  }
}