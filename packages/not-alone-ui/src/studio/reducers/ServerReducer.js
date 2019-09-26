import {DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, NEW_GAME, PLAY_MOVE, SERVER_NOTIFICATION, UNDO_MOVE} from '../StudioActions'
import produce from 'immer'
import {getRandom} from '@bga/not-alone/game-api/Random'

const isEqual = require("react-fast-compare");

export const MOVE_PLAYED = 'MOVE_PLAYED', MOVE_UNDONE = 'MOVE_UNDONE'

function executeMove(Game, state, move) {
  Game.moves[move.type].execute(state.game, move)
  state.moveHistory.push(move)
  state.pendingNotifications.push({type: MOVE_PLAYED, move: getMoveView(Game.moves[move.type], move, state.playerId, state.game)})
}

export function getMoveView(Move, move, playerId, game) {
  return Move.getView ? Move.getView(move, playerId, game) : move;
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
        return {initialState: action.game, game: action.game, moveHistory: [], pendingNotifications: [], playerId: playerIds[0], playersMap}
      case PLAY_MOVE:
        const allowedMoves = Game.getLegalMoves(state.game, action.playerId);
        if (!allowedMoves.some(move => isEqual(move, action.move))) {
          console.error("This move is not authorized right now: " + JSON.stringify(action.move));
          return state
        }
        return produce(state, draft => {
          executeMove(Game, draft, action.move)
          let counter = 0
          while (Game.getAutomaticMove(draft.game)) {
            if (counter > 100) {
              throw new Error("Maximum number of automatic moves reached (100). Rollback action due to infinite loop.")
            }
            executeMove(Game, draft, Game.getAutomaticMove(draft.game))
            counter++
          }
        })
      case SERVER_NOTIFICATION:
        return {...state, pendingNotifications: state.pendingNotifications.slice(action.notifications.length)}
      case UNDO_MOVE:
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
      case DISPLAY_PLAYER_VIEW:
        return {...state, pendingNotifications: [], playerId: action.playerId}
      case DISPLAY_SPECTATOR_VIEW:
        return {...state, pendingNotifications: [], playerId: undefined}
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

export const findLastIndex = (array, predicate) => {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array))
      return l;
  }
  return -1;
}