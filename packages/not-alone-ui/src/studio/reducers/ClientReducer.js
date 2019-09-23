import {DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, MOVE_BACK, MOVE_FORWARD, NEW_GAME, PLAY_MOVE, RESUME, SERVER_NOTIFICATION} from "../StudioActions"
import produce from "immer"
import {findLastIndex, MOVE_PLAYED} from "./ServerReducer"

const isEqual = require("react-fast-compare");

function reportMove(Game, game, playerId, move) {
  const Move = Game.moves[move.type]
  const moveCopy = JSON.parse(JSON.stringify(move)) // Prevents original move object to be modified if some reference inside it escape the object at some point
  if (Move.reportInView) {
    Move.reportInView(game, moveCopy, playerId)
  } else {
    Move.execute(game, moveCopy)
  }
}

/**
 * Apply all pending moves for the state until some animation is reached (or everything is up to date)
 */
function resume(Game, GameUI, state, initialState) {
  while (!state.animation && hasPendingMove(state)) {
    applyPendingMove(Game, GameUI, state, initialState)
  }
}

function hasPendingMove(state) {
  if (state.animation) {
    return true
  }
  if (state.replayToMove !== undefined) {
    return state.currentMove < state.replayToMove
  } else if (state.currentMove < state.moveHistory.length) {
    return true
  } else {
    return state.pendingNotifications.length > 0
  }
}

function applyPendingMove(Game, GameUI, state, initialState) {
  let type, move
  if (state.replayToMove || state.currentMove < state.moveHistory.length) {
    type = MOVE_PLAYED
    move = state.moveHistory[state.currentMove]
  } else {
    const pendingNotification = state.pendingNotifications[0];
    type = pendingNotification.type
    move = pendingNotification.move
    state.pendingNotifications.splice(0, 1)
    const expectedNotificationIndex = state.expectedNotifications.findIndex(notification => isEqual(notification, pendingNotification));
    if (expectedNotificationIndex !== -1) {
      state.expectedNotifications.splice(expectedNotificationIndex, 1)
      return
    }
  }
  if (type === MOVE_PLAYED) {
    if (state.moveHistory.length === state.currentMove) {
      state.moveHistory.push(move)
    }
    state.currentMove++
    reportMove(Game, state.game, state.playerId, move)
  } else {
    const moveIndex = findLastIndex(state.moveHistory, historyMove => isEqual(historyMove, move))
    if (moveIndex < 0) {
      console.error("This move does not exist, it cannot be undone: " + JSON.stringify(move));
      return state
    }
    state.moveHistory.splice(moveIndex, 1)
    state.currentMove--
    state.game = state.moveHistory.reduce((game, move) => {
      reportMove(Game, game, state.playerId, move)
      return game
    }, state.initialState)
    state.initialState = initialState
  }
  const animation = {type, move}
  const Move = Game.moves[move.type]
  animation.duration = Move.animationDelay ? Move.animationDelay(animation, state.playerId, state.game) : 0
  if (animation.duration) {
    state.animation = animation
  }
}

export function createClientReducer(Game, GameUI) {
  return (state = {}, action) => {
    switch (action.type) {
      case NEW_GAME:
        const playerId = Game.getPlayerIds(action.game)[0]
        const gameView = Game.getPlayerView(action.game, playerId)
        return {game: gameView, initialState: gameView, playerId, pendingNotifications: [], expectedNotifications: [], moveHistory: [], currentMove: 0}
      case SERVER_NOTIFICATION:
        return produce(state, draft => {
          draft.pendingNotifications.push(...action.notifications)
          resume(Game, GameUI, draft, state.initialState)
        })
      case PLAY_MOVE:
        return produce(state, draft => {
          draft.expectedNotifications.push({type: MOVE_PLAYED, move: action.move})
          draft.moveHistory.push(action.move)
          draft.currentMove++
          reportMove(Game, draft.game, draft.playerId, action.move)
        })
      case RESUME:
        return produce(state, draft => {
          draft.animation = null
          resume(Game, GameUI, draft, state.initialState)
        })
      case DISPLAY_PLAYER_VIEW:
      case DISPLAY_SPECTATOR_VIEW:
        return {...action, pendingNotifications: [], expectedNotifications:[], currentMove: action.moveHistory.length}
      case MOVE_BACK:
        const currentMove = action.moves ? Math.max(0, state.currentMove - action.moves) : 0
        const game = produce(state.initialState, draft => {
            for (let i = 0; i < currentMove; i++) {
              reportMove(Game, draft, state.playerId, state.moveHistory[i])
            }
          })
        return {...state, animation: null, game, currentMove, replayToMove: currentMove, hold: 0}
      case MOVE_FORWARD:
        return produce(state, draft => {
          if (draft.replayToMove !== undefined && action.moves !== undefined && draft.replayToMove + action.moves <= draft.moveHistory.length) {
            draft.replayToMove = draft.replayToMove + action.moves
          } else {
            draft.replayToMove = undefined
          }
          resume(Game, GameUI, draft, state.initialState)
        })
      default:
        return state
    }
  }
}

export function notificationsAnimationListener(GameUI, store) {
  let timeout

  return () => {
    const animation = store.getState().client.animation
    if (animation && animation.duration) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          store.dispatch({type: RESUME})
        }, animation.duration * 1000 + 100) // TODO: remove +100 and instead start timeout after UI rendering (to be sure that animations are done when we resume)
      }
    } else if (timeout) {
      clearTimeout(timeout);
      timeout = null
    }
  }
}
