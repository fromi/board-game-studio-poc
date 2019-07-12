import {DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, NEW_GAME, SERVER_NOTIFICATION, PLAY_MOVE, UNDO_MOVE, MOVE_BACK, MOVE_FORWARD} from "../StudioActions"
import produce from "immer"
import {getRandom} from "../../game-api/Random"

const isEqual = require("react-fast-compare");

export const MOVE_PLAYED = 'MOVE_PLAYED', MOVE_UNDONE = 'MOVE_UNDONE'

function executeMove(Game, state, move) {
  Game.moves[move.type].execute(state.game, move)
  state.moveHistory.push(move)
  state.pendingNotifications.push({type: MOVE_PLAYED, move: getMoveView(Game.moves[move.type], move, state.playerId, state.game)})
}

export function getMoveView(Move, move, playerId, game) {
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

export function createServerReducer(Game) {
  return (state = {}, action) => {
    switch (action.type) {
      case NEW_GAME:
        const playerIds = Game.getPlayerIds(action.game)
        const players = getRandom(fakePlayers, playerIds.length)
        const playersMap = playerIds.reduce((map, playerId) => {
          map[playerId] = players.pop()
          return map;
        }, {});
        return {...state, initialState: action.game, game: action.game, moveHistory: [], pendingNotifications: [], playerId: playerIds[0], playersMap, back: 0}
      case PLAY_MOVE:
        if (state.back > 0) {
          console.error("You cannot play a move while playing back the history. Go to latest move by using game.displayPlayerView or displaySpectatorView.");
          return state
        }
        return produce(state, draft => {
          executeMove(Game, draft, action.move)
          while (Game.getAutomaticMove(draft.game)) {
            executeMove(Game, draft, Game.getAutomaticMove(draft.game))
          }
        })
      case SERVER_NOTIFICATION:
        return {...state, pendingNotifications: state.pendingNotifications.slice(action.notifications.length)}
      case UNDO_MOVE:
        if (state.back > 0) {
          console.error("You cannot undo a move while playing back the history. Go to latest move by using game.displayPlayerView or displaySpectatorView.");
          return state
        }
        const moveIndex = findLastIndex(state.moveHistory, move => isEqual(move, action.move))
        if (moveIndex < 0) {
          console.error("This move does not exist, it cannot be undone: " + JSON.stringify(action.move));
          return state
        }
        return produce(state, draft => {
          draft.moveHistory.splice(moveIndex, 1)
          draft.game = draft.moveHistory.reduce((state, move) => {
            Game.moves[move.type].execute(state, move)
            return state
          }, draft.initialState)
          draft.initialState = state.initialState
          draft.pendingNotifications.push({type: MOVE_UNDONE, move: getMoveView(Game.moves[action.move.type], action.move, state.playerId, draft.game)})
        })
      case MOVE_BACK:
        return produce(state, draft => {
          const currentMove = state.moveHistory.length - state.back - 1
          for (let i = currentMove; i >= 0 && i > currentMove - action.moves; i--) {
            draft.pendingNotifications.push({type: MOVE_UNDONE, move: getMoveView(Game.moves[state.moveHistory[i].type], state.moveHistory[i], state.playerId, draft.game)})
            draft.back += 1
          }
        })
      case MOVE_FORWARD:
        return produce(state, draft => {
          const currentMove = state.moveHistory.length - state.back - 1
          for (let i = currentMove + 1; i < state.moveHistory.length && i <= currentMove + action.moves; i++) {
            draft.pendingNotifications.push({type: MOVE_PLAYED, move: getMoveView(Game.moves[state.moveHistory[i].type], state.moveHistory[i], state.playerId, draft.game)})
            draft.back -= 1
          }
        })
      case DISPLAY_PLAYER_VIEW:
        return {...state, pendingNotifications: [], playerId: action.playerId, back: 0}
      case DISPLAY_SPECTATOR_VIEW:
        return {...state, pendingNotifications: [], playerId: undefined, back: 0}
      default:
        return state
    }
  }
}

export function pendingNotificationsListener(Game, store) {
  let notifying = false
  return () => {
    const pendingNotifications = store.getState().server.pendingNotifications
    if (!notifying && pendingNotifications.length > 0) {
      setTimeout(() => {
        notifying = false
        store.dispatch({type: SERVER_NOTIFICATION, notifications: pendingNotifications})
      }, 50)
      notifying = true
    }
  }
}

const menNames = ['John', 'Bob', 'Vincent', 'Roger', 'Luck', 'Xavier', 'Stephen', 'Nicolas', 'Gregory']
const womenNames = ['Alice', 'Clara', 'Debora', 'Elena', 'Fanny', 'Helen', 'Iris', 'Maria', 'Lila']
const fakePlayers = menNames.map(name => ({name, gender: '♂'})).concat(womenNames.map(name => ({name, gender: '♀'})))

const findLastIndex = (array, predicate) => {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array))
      return l;
  }
  return -1;
}