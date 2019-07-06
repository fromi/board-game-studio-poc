import React from 'react'
import {connect, Provider} from 'react-redux'
import * as PropTypes from "prop-types"
import {applyMiddleware, combineReducers, createStore} from "redux"
import {DndProvider} from "react-dnd"
import TouchBackend from 'react-dnd-touch-backend'
import {createServerReducer, getMoveView, pendingNotificationsListener} from "./reducers/ServerReducer"
import {createClientReducer, notificationsAnimationListener} from "./reducers/ClientReducer"
import {
  APPLY_ANIMATING_MOVE,
  DISPLAY_PLAYER_VIEW,
  DISPLAY_SPECTATOR_VIEW,
  END_ANIMATION,
  MOVE_BACK,
  MOVE_FORWARD,
  NEW_GAME,
  PLAY_MOVE,
  UNDO_MOVE
} from "./StudioActions"
import {priorMoveMiddleware} from "./middleware/PriorMoveMiddleware"
import {prepareMoveMiddleware} from "./middleware/PrepareMoveMiddleware"
import {useTranslation} from "react-i18next"
import "./i18n"

export const createStudio = (Game, GameUI) => {
  const store = createStudioStore(Game, GameUI)
  createConsoleTools(Game, store)
  return () => <Studio store={store} GameUI={GameUI}/>
}

const createStudioStore = (Game, GameUI) => {
  const localStorageKey = 'state'
  const server = createServerReducer(Game)
  const client = createClientReducer(Game)
  const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || undefined
  const store = createStore(combineReducers({server, client}), savedState,
    applyMiddleware(priorMoveMiddleware(Game), prepareMoveMiddleware(Game)))
  store.subscribe(pendingNotificationsListener(Game, store))
  store.subscribe(notificationsAnimationListener(GameUI, store))
  store.subscribe(() => localStorage.setItem(localStorageKey, JSON.stringify(store.getState())))
  if (!savedState) {
    store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers: 3})})
  } else if (savedState.client.animation) {
    if (savedState.client.animation.moveApplied) {
      store.dispatch({type: END_ANIMATION})
    } else {
      store.dispatch({type: APPLY_ANIMATING_MOVE})
    }
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
    getPlayerMoves: (playerId) => Game.getMandatoryMoves(window.game.state, playerId).concat(Game.getOptionalMoves(window.game.state, playerId)),
    play: (playerId, move) => store.dispatch({type: PLAY_MOVE, playerId, move}),
    back: (moves = 1) => store.dispatch({type: MOVE_BACK, moves}),
    forward: (moves = 1) => store.dispatch({type: MOVE_FORWARD, moves}),
    displayPlayerView: (playerId) => {
      const moveHistory = store.getState().server.moveHistory.map(move => getMoveView(Game.moves[move.type], move, playerId, window.game.state))
      const initialState = Game.getPlayerView(store.getState().server.initialState, playerId)
      return store.dispatch({type: DISPLAY_PLAYER_VIEW, playerId, game: Game.getPlayerView(window.game.state, playerId), moveHistory, initialState})
    },
    displaySpectatorView: () => {
      const moveHistory = store.getState().server.moveHistory.map(move => getMoveView(Game.moves[move.type], move, undefined, window.game.state))
      const initialState = Game.getPlayerView(store.getState().server.initialState)
      return store.dispatch({type: DISPLAY_SPECTATOR_VIEW, game: Game.getSpectatorView(window.game.state), moveHistory, initialState})
    },
  }
}

const Studio = ({store, GameUI}) => {
  const {i18n} = useTranslation();
  window.changeLanguage = (language) => i18n.changeLanguage(language)
  const GameView = connect(state => ({
    ...state.client, playersMap: state.server.playersMap
  }), (dispatch) => ({
    play: (move) => dispatch({type: PLAY_MOVE, playerId: store.getState().client.playerId, move}),
    undo: (move) => dispatch({type: UNDO_MOVE, playerId: store.getState().client.playerId, move})
  }))(GameUI.Interface)

  return (
    <DndProvider backend={TouchBackend}>
      <Provider store={store}>
        <GameView/>
      </Provider>
    </DndProvider>
  )
}

Studio.propTypes = {
  store: PropTypes.object,
  GameUI: PropTypes.shape({
    Interface: PropTypes.func.isRequired,
    getPreAnimationDelay: PropTypes.func,
    getAnimationDelay: PropTypes.func
  }).isRequired
}
