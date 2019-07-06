import {
  APPLY_ANIMATING_MOVE,
  DISPLAY_PLAYER_VIEW,
  DISPLAY_SPECTATOR_VIEW,
  END_ANIMATION,
  NEW_GAME,
  SERVER_NOTIFICATION,
  START_ANIMATION
} from "../StudioActions"
import produce from "immer"
import {MOVE_PLAYED} from "./ServerReducer"

const isEqual = require("react-fast-compare");

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

export function createClientReducer(Game) {
  return (state = {}, action) => {
    switch (action.type) {
      case NEW_GAME:
        const playerId = Game.getPlayerIds(action.game)[0]
        const game = Game.getPlayerView(action.game, playerId)
        return {game, initialState: game, playerId, pendingNotifications: [], moveHistory: []}
      case SERVER_NOTIFICATION:
        // TODO: if we have both similar PLAY_MOVE and UNDO_MOVE pending notifications, we can delete both instead of play them both.
        return {...state, pendingNotifications: state.pendingNotifications.concat(action.notifications)}
      case START_ANIMATION:
        const animation = {...state.pendingNotifications[0], moveApplied: false}
        return {...state, animation, pendingNotifications: state.pendingNotifications.slice(1)}
      case APPLY_ANIMATING_MOVE:
        return produce(state, draft => {
          if (draft.animation.type === MOVE_PLAYED) {
            reportMove(Game, draft.game, draft.playerId, draft.animation.move)
            draft.moveHistory.push(draft.animation.move)
          } else {
            const moveIndex = draft.moveHistory.reverse().findIndex(move => isEqual(move, draft.animation.move))
            draft.moveHistory.splice(moveIndex, 1)
            draft.moveHistory.reverse()
            draft.game = draft.moveHistory.reduce((state, move) => {
              reportMove(Game, state, draft.playerId, move)
              return state
            }, draft.initialState)
            draft.initialState = state.initialState
          }
          draft.animation.moveApplied = true
        })
      case END_ANIMATION:
        return {...state, animation: null}
      case DISPLAY_PLAYER_VIEW:
        return {game: action.game, playerId: action.playerId, pendingNotifications: [], moveHistory: action.moveHistory, initialState: action.initialState}
      case DISPLAY_SPECTATOR_VIEW:
        return {game: action.game, pendingNotifications: [], moveHistory: action.moveHistory, initialState: action.initialState}
      default:
        return state
    }
  }
}

export function notificationsAnimationListener(GameUI, store) {
  const applyAnimatingNotification = () => {
    const animation = store.getState().client.animation
    if (animation) {
      const animationDelay = GameUI.getAnimationDelay ? GameUI.getAnimationDelay(animation, store.getState().client.playerId) : 0
      store.dispatch({type: APPLY_ANIMATING_MOVE})
      setTimeout(() => store.dispatch({type: END_ANIMATION}), animationDelay * 1000)
    }
  }

  return () => {
    const state = store.getState().client
    if (!state.animation && state.pendingNotifications.length) {
      const animation = state.pendingNotifications[0]
      const preAnimationDelay = GameUI.getPreAnimationDelay ? GameUI.getPreAnimationDelay(animation, store.getState().client.playerId) : 0
      store.dispatch({type: START_ANIMATION})
      setTimeout(applyAnimatingNotification, preAnimationDelay * 1000)
    }
  }
}