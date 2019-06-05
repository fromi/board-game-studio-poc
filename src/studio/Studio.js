import React from 'react'
import {connect, Provider} from 'react-redux'
import GamePropType from "./GamePropType"
import * as PropTypes from "prop-types"
import {applyMiddleware, combineReducers, createStore} from "redux"
import {automaticMovesListener, createServerReducer} from "./reducers/ServerReducer"
import {createClientReducer} from "./reducers/ClientReducer"
import {DISPLAY_PLAYER_VIEW, DISPLAY_SPECTATOR_VIEW, NEW_GAME, PLAY_MOVE} from "./StudioActions"
import {priorMoveMiddleware} from "./middleware/PriorMoveMiddleware"
import {prepareMoveMiddleware} from "./middleware/PrepareMoveMiddleware"

const Studio = ({Game, GameUI}) => {
  const server = createServerReducer(Game)
  const client = createClientReducer(Game)
  const store = createStore(combineReducers({server, client}),
    applyMiddleware(priorMoveMiddleware(Game), prepareMoveMiddleware(Game)))
  store.subscribe(automaticMovesListener(Game, store))
  store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers: 3})})
  const GameView = connect(state => ({
    game: state.client.game,
    player: state.client.playerId,
    play: (move) => store.dispatch({type: PLAY_MOVE, playerId: state.client.playerId, move})}))(GameUI)

  // Tools for console control
  window.Game = Game;
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
    displaySpectatorView: () => store.dispatch({type: DISPLAY_SPECTATOR_VIEW, game: window.game.state})
  }

  return (
    <Provider store={store}>
      <GameView/>
    </Provider>
  )
}

Studio.propTypes = {
  Game: GamePropType.isRequired,
  GameUI: PropTypes.func.isRequired
}

export default Studio

