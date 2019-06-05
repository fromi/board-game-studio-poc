import {CANCEL_MOVE, DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, NEW_GAME, PLAY_MOVE} from "../StudioActions"
import produce from "immer"

function getMoveView(Move, move, playerId, game) {
  if (Move.getOwnView && move.playerId === playerId) {
    return Move.getOwnView(move, game)
  } else if (Move.getSpectatorView && !playerId) {
    return Move.getSpectatorView(move, game)
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
  } else if (Move.reportInSpectatorView && !playerId) {
    Move.reportInSpectatorView(game, move)
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
  } else if (Move.cancelInSpectatorView && !playerId) {
    Move.cancelInSpectatorView(game, move)
  } else if (Move.cancelInPlayerView) {
    Move.cancelInPlayerView(game, move, playerId)
  } else if (Move.cancelInView) {
    Move.cancelInView(game, move)
  } else {
    Move.cancel(game, move)
  }
}

export function createClientReducer(Game) {
  return (state = {}, action) => {
    switch (action.type) {
      case NEW_GAME:
        const playerId = Game.getPlayerIds(action.game)[0]
        return {game: Game.getPlayerView(action.game, playerId), playerId}
      case PLAY_MOVE:
        return produce(state, draft => {
          reportMove(Game.moves[action.move.type], state.playerId, draft.game, action.move)
        })
      case CANCEL_MOVE:
        return produce(state, draft => {
          cancelMove(Game.moves[action.move.type], state.playerId, draft.game, action.move)
        })
      case DISPLAY_PLAYER_VIEW:
        return {game: Game.getPlayerView(action.game, action.playerId), playerId: action.playerId}
      case DISPLAY_SPECTATOR_VIEW:
        return {game: Game.getSpectatorView(action.game)}
      default:
        return state
    }
  }
}