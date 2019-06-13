import React from 'react'
import {connect, Provider} from 'react-redux'
import * as PropTypes from "prop-types"
import {applyMiddleware, combineReducers, createStore} from "redux"
import {createServerReducer, pendingNotificationsListener} from "./reducers/ServerReducer"
import {createClientReducer, movesAnimationListener} from "./reducers/ClientReducer"
import {DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, NEW_GAME, PLAY_MOVE} from "./StudioActions"
import {priorMoveMiddleware} from "./middleware/PriorMoveMiddleware"
import {prepareMoveMiddleware} from "./middleware/PrepareMoveMiddleware"
import {useTranslation} from "react-i18next";
import "./i18n"

const Studio = ({Game, GameUI}) => {
  const {i18n} = useTranslation();
  const server = createServerReducer(Game)
  const client = createClientReducer(Game)
  const localStorageKey = 'state'
  const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || undefined
  const store = createStore(combineReducers({server, client}), savedState,
    applyMiddleware(priorMoveMiddleware(Game), prepareMoveMiddleware(Game)))
  store.subscribe(pendingNotificationsListener(Game, store))
  store.subscribe(movesAnimationListener(GameUI, store))
  store.subscribe(() => localStorage.setItem(localStorageKey, JSON.stringify(store.getState())))
  if (!savedState) {
    store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers: 3})})
  }
  const GameView = connect(state => ({
    ...state.client,
    play: (move) => store.dispatch({type: PLAY_MOVE, playerId: state.client.playerId, move})
  }))(GameUI.Interface)

  // Tools for console control
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
    getPlayerMoves: (playerId) => Game.getMandatoryMoves(window.game.state, playerId).concat(Game.getOptionalMoves(window.game.state, playerId)),
    play: (playerId, move) => store.dispatch({type: PLAY_MOVE, playerId, move}),
    displayPlayerView: (playerId) => store.dispatch({type: DISPLAY_PLAYER_VIEW, playerId, game: window.game.state}),
    displaySpectatorView: () => store.dispatch({type: DISPLAY_SPECTATOR_VIEW, game: window.game.state}),
    changeLanguage: (language) => i18n.changeLanguage(language)
  }

  return (
    <Provider store={store}>
      <GameView/>
    </Provider>
  )
}

Studio.propTypes = {
  Game: PropTypes.shape({
    setup: PropTypes.func.isRequired,
    getPlayerIds: PropTypes.func.isRequired,
    getMandatoryMoves: PropTypes.func.isRequired,
    getOptionalMoves: PropTypes.func.isRequired,
    getPlayerView: PropTypes.func.isRequired,
    getSpectatorView: PropTypes.func.isRequired,
    getAutomaticMove: PropTypes.func.isRequired
  }).isRequired,
  GameUI: PropTypes.shape({
    Interface: PropTypes.func.isRequired,
    getPreAnimationDelay: PropTypes.func,
    getAnimationDelay: PropTypes.func
  }).isRequired
}

export default Studio

