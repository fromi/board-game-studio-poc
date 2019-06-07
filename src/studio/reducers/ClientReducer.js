import {
  APPLY_ANIMATING_MOVE,
  CANCEL_MOVE,
  DISPLAY_PLAYER_VIEW,
  DISPLAY_SPECTATOR_VIEW,
  END_ANIMATION,
  NEW_GAME,
  NOTIFY_MOVES,
  START_ANIMATION
} from "../StudioActions"
import produce from "immer"
import {getAnimationDelay, getPreAnimationDelay} from "../../not-alone/NotAloneUI"

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

function reportMove(Game, game, playerId, move) {
  const Move = Game.moves[move.type]
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
    console.log(action)
    switch (action.type) {
      case NEW_GAME:
        const playerId = Game.getPlayerIds(action.game)[0]
        return {game: Game.getPlayerView(action.game, playerId), playerId, pendingMoves: []}
      case NOTIFY_MOVES:
        return {...state, pendingMoves: state.pendingMoves.concat(action.moves)}
      case START_ANIMATION:
        const animation = {move: state.pendingMoves[0], moveApplied: false}
        return {...state, animation, pendingMoves: state.pendingMoves.slice(1)}
      case APPLY_ANIMATING_MOVE:
        return produce(state, draft => {
          reportMove(Game, draft.game, draft.playerId, draft.animation.move)
          draft.animation.moveApplied = true
        })
      case END_ANIMATION:
        return {...state, animation: null}
      case CANCEL_MOVE:
        return produce(state, draft => {
          cancelMove(Game.moves[action.move.type], state.playerId, draft.game, action.move)
        })
      case DISPLAY_PLAYER_VIEW:
        return {game: Game.getPlayerView(action.game, action.playerId), playerId: action.playerId, pendingMoves: []}
      case DISPLAY_SPECTATOR_VIEW:
        return {game: Game.getSpectatorView(action.game), pendingMoves: []}
      default:
        return state
    }
  }
}

export function movesAnimationListener(GameUI, store) {
  const applyAnimatingMove = () => {
    const move = store.getState().client.animation.move
    store.dispatch({type: APPLY_ANIMATING_MOVE})
    setTimeout(() => store.dispatch({type: END_ANIMATION}), getAnimationDelay(move) * 1000)
  }

  return () => {
    const state = store.getState().client
    console.log(state)
    if (!state.animation && state.pendingMoves.length) {
      const move = state.pendingMoves[0]
      store.dispatch({type: START_ANIMATION})
      setTimeout(applyAnimatingMove, getPreAnimationDelay(move) * 1000)
    }
  }
}