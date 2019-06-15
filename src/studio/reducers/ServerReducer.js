import {CANCEL_MOVE, DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, NEW_GAME, NOTIFY_MOVES, PLAY_MOVE} from "../StudioActions"
import produce from "immer"
import {getRandom} from "../../game-api/Random"

function executeMove(Game, state, move) {
  Game.moves[move.type].execute(state.game, move)
  state.moveHistory.push(move)
  state.pendingNotifications.push(getMoveView(Game.moves[move.type], move, state.playerId, state.game))
}

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

export function createServerReducer(Game) {
  return (state = {}, action) => {
    switch (action.type) {
      case NEW_GAME:
        const playerIds = Game.getPlayerIds(action.game)
        const players = getRandom(fakePlayers, playerIds.length)
        const playersMap = playerIds.reduce(function(map, playerId) {
          map[playerId] = players.pop()
          return map;
        }, {});
        return {...state, game: action.game, moveHistory: [], pendingNotifications: [], playerId: playerIds[0], playersMap}
      case PLAY_MOVE:
        return produce(state, draft => {
          executeMove(Game, draft, action.move)
          while (Game.getAutomaticMove(draft.game)) {
            executeMove(Game, draft, Game.getAutomaticMove(draft.game))
          }
        })
      case NOTIFY_MOVES:
        return {...state, pendingNotifications: []}
      case CANCEL_MOVE:
        return produce(state, draft => {
          Game.moves[action.move.type].cancel(draft.game, action.move)
          draft.moveHistory.splice(draft.moveHistory.lastIndexOf(action.move), 1)
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
  return () => {
    const pendingNotifications = store.getState().server.pendingNotifications
    if (pendingNotifications.length > 0) {
      setTimeout(() => store.dispatch({type: NOTIFY_MOVES, moves: pendingNotifications}), 50)
    }
  }
}

const menNames = ['John', 'Bob', 'Vincent', 'Roger', 'Luck', 'Xavier', 'Stephen', 'Nicolas', 'Gregory']
const womenNames = ['Alice', 'Clara', 'Debora', 'Elena', 'Fanny', 'Helen', 'Iris', 'Maria', 'Lila']
const fakePlayers = menNames.map(name => ({name, gender: '♂'})).concat(womenNames.map(name => ({name, gender: '♀'})))
