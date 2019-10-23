import React from 'react'
import {connect, Provider} from 'react-redux'
import * as PropTypes from 'prop-types'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {DndProvider} from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import {createServerReducer, getMoveView, pendingNotificationsListener} from './reducers/ServerReducer'
import {createClientReducer, notificationsAnimationListener} from './reducers/ClientReducer'
import {DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, MOVE_BACK, MOVE_FORWARD, NEW_GAME, PLAY_MOVE, RESUME, UNDO_MOVE} from './StudioActions'
import {priorMoveMiddleware} from './middleware/PriorMoveMiddleware'
import {prepareMoveMiddleware} from './middleware/PrepareMoveMiddleware'
import {useTranslation} from 'react-i18next'
import './i18n'
import produce from 'immer'

export const createStudio = (Game, GameUI) => {
  const store = createStudioStore(Game, GameUI)
  createConsoleTools(Game, store)
  return () => <Studio store={store} GameUI={GameUI} Game={Game}/>
}

const createStudioStore = (Game, GameUI) => {
  const localStorageKey = 'state'
  const server = createServerReducer(Game)
  const client = createClientReducer(Game, GameUI)
  const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || undefined
  const store = createStore(combineReducers({server, client}), savedState,
    applyMiddleware(priorMoveMiddleware(Game), prepareMoveMiddleware(Game)))
  store.subscribe(pendingNotificationsListener(Game, store))
  store.subscribe(notificationsAnimationListener(GameUI, store))
  store.subscribe(() => localStorage.setItem(localStorageKey, JSON.stringify(store.getState())))
  if (!savedState) {
    store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers: 3})})
  } else if (savedState.client.animation) {
    store.dispatch({type: RESUME})
  }
  return store
}

const createConsoleTools = (Game, store) => {
  window.Game = Game
  window.game = {
    get state() {
      return store.getState().server.game
    },
    get history() {
      return store.getState().server.moveHistory
    },
    get playerIds() {
      return Game.getPlayerIds(window.game.state)
    },
    get moves() {
      return window.game.playerIds.reduce((map, playerId) => {
        const playerMoves = window.game.getPlayerMoves(playerId)
        if (playerMoves.length > 0)
          map[playerId] = playerMoves
        return map
      }, {})
    },
    new: (numberOfPlayers = 3) => store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers})}),
    getPlayerMoves: (playerId) => Game.getLegalMoves(window.game.state, playerId),
    play: (playerId, move) => store.dispatch({type: PLAY_MOVE, playerId, move}),
    undo: (move) => {
      if (!move) {
        const history = store.getState().server.moveHistory;
        move = history[history.length - 1]
      }
      store.dispatch({type: UNDO_MOVE, move})
    },
    back: (moves) => store.dispatch({type: MOVE_BACK, moves}),
    forward: (moves) => store.dispatch({type: MOVE_FORWARD, moves}),
    displayPlayerView: (playerId) => {
      const {moveHistory} = produce(store.getState().server, draft => {
        const game = draft.initialState
        draft.moveHistory = draft.moveHistory.map((move) => {
          let Move = Game.moves[move.type];
          Move.execute(game, move)
          return getMoveView(Move, move, playerId, game)
        })
      })
      const initialState = Game.getPlayerView(store.getState().server.initialState, playerId)
      return store.dispatch({type: DISPLAY_PLAYER_VIEW, playerId, game: Game.getPlayerView(window.game.state, playerId), moveHistory, initialState})
    },
    displaySpectatorView: () => {
      const moveHistory = store.getState().server.moveHistory.map(move => getMoveView(Game.moves[move.type], move, undefined, window.game.state))
      const initialState = Game.getSpectatorView(store.getState().server.initialState)
      return store.dispatch({type: DISPLAY_SPECTATOR_VIEW, game: Game.getSpectatorView(window.game.state), moveHistory, initialState})
    }
  }
}

const Studio = ({store, GameUI}) => {
  const {i18n} = useTranslation();
  window.changeLanguage = (language) => i18n.changeLanguage(language)
  const GameView = connect(state => ({
    ...state.client, playersMap: state.server.playersMap
  }), (dispatch) => ({
    play: (move) => {
      if (store.getState().client.replayToMove !== undefined) {
        console.error("You cannot undo a move while playing back the history. Go to latest move by using game.forward().");
      } else {
        dispatch({type: PLAY_MOVE, playerId: store.getState().client.playerId, move})
      }
    },
    undo: (move) => {
      if (store.getState().client.replayToMove !== undefined) {
        console.error("You cannot undo a move while playing back the history. Go to latest move by using game.forward().");
      } else {
        dispatch({type: UNDO_MOVE, playerId: store.getState().client.playerId, move})
      }
    },
    replay: (startingMove) => {
      store.dispatch({type: MOVE_BACK, moves: store.getState().client.moveHistory.length - startingMove})
      setTimeout(() => store.dispatch({type: MOVE_FORWARD}), 1000)
    }
  }))(GameUI.Interface)

  return (
    <DndProvider backend={MultiBackend(HTML5toTouch)}>
      <Provider store={store}>
        <GameView/>
      </Provider>
    </DndProvider>
  )
}

Studio.propTypes = {
  store: PropTypes.object,
  GameUI: PropTypes.shape({
    Interface: PropTypes.func.isRequired
  }),
  Game: PropTypes.shape({
    moves: PropTypes.object.isRequired,
    setup: PropTypes.func.isRequired,
    getPlayerIds: PropTypes.func.isRequired,
    getLegalMoves: PropTypes.func.isRequired,
    getPlayerView: PropTypes.func.isRequired,
    getSpectatorView: PropTypes.func.isRequired,
    getAutomaticMove: PropTypes.func.isRequired,
  }).isRequired
}
