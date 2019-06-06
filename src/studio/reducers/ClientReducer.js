import {CANCEL_MOVE, DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, END_TRANSITION, NEW_GAME, NOTIFY_MOVES} from "../StudioActions"
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
        return {game: Game.getPlayerView(action.game, playerId), playerId, transitions: []}
      case NOTIFY_MOVES:
        let newState = state.transitions.length > 0 ? state.transitions[state.transitions.length - 1].newState : state.game
        const newTransitions = action.moves.map(move => {
          newState = produce(newState, draft => {
            reportMove(Game.moves[move.type], state.playerId, draft, move)
          })
          return {move, newState}
        })
        return {...state, transitions: state.transitions.concat(newTransitions)}
      case CANCEL_MOVE:
        return produce(state, draft => {
          cancelMove(Game.moves[action.move.type], state.playerId, draft.game, action.move)
        })
      case DISPLAY_PLAYER_VIEW:
        return {game: Game.getPlayerView(action.game, action.playerId), playerId: action.playerId, transitions: []}
      case DISPLAY_SPECTATOR_VIEW:
        return {game: Game.getSpectatorView(action.game), transitions: []}
      case END_TRANSITION:
        return {...state, game: state.transitions[0].newState, transitions: state.transitions.slice(1)}
      default:
        return state
    }
  }
}

export function movesAnimationListener(getMoveAnimationDelay, store) {
  let animationTimeout;
  return () => {
    const transitions = store.getState().client.transitions
    if (transitions.length > 0 && !animationTimeout) {
      const moveAnimationDelay = getMoveAnimationDelay({move: transitions[0].move})
      if (moveAnimationDelay) {
        animationTimeout = setTimeout(() => {
          animationTimeout = undefined
          store.dispatch({type: END_TRANSITION})
        }, moveAnimationDelay * 1000)
      } else {
        store.dispatch({type: END_TRANSITION})
      }
    }
  }
}