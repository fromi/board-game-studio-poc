import React from 'react'
import {Provider} from 'react-redux'
import GamePropType from "./GamePropType"
import StudioTools from './StudioTools'
import PlayerViews from "./PlayerViews"
import './studio.css'
import * as PropTypes from "prop-types"
import {applyMiddleware, combineReducers, createStore} from "redux"
import {studio} from "./reducers/StudioReducer"
import {automaticMovesListener, createServerReducer} from "./reducers/ServerReducer"
import {createClientsReducer} from "./reducers/ClientsReducer"
import {NEW_GAME, PLAY_MOVE, SELECT_TAB} from "./StudioActions"
import {priorMoveMiddleware} from "./middleware/PriorMoveMiddleware"
import {prepareMoveMiddleware} from "./middleware/PrepareMoveMiddleware"

const Studio = ({Game, GameUI}) => {
  const server = createServerReducer(Game)
  const clients = createClientsReducer(Game)
  const store = createStore(combineReducers({studio, server, clients}),
    applyMiddleware(priorMoveMiddleware(Game), prepareMoveMiddleware(Game)))
  store.subscribe(automaticMovesListener(Game, store))
  store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers: 3})})

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
        const playerMoves = window.getPlayerMoves(playerId)
        if (playerMoves.length > 0)
          map[playerId] = playerMoves
        return map
      }, {})
    },
    getPlayerMoves: (playerId) => Game.getMandatoryMoves(window.game.state, playerId).concat(Game.getOptionalMoves(window.game.state, playerId)),
    play: (playerId, move) => store.dispatch({type: PLAY_MOVE, playerId, move}),
    displayPlayerView: (playerId) => store.dispatch({type: SELECT_TAB, tab: 'Player: ' + playerId}),
    displaySpectatorView: () => store.dispatch({type: SELECT_TAB, tab: 'Spectator'})
  }

  return (
    <Provider store={store}>
      <StudioTools Game={Game}/>
      <PlayerViews GameUI={GameUI}/>
    </Provider>
  )
}

Studio.propTypes = {
  Game: GamePropType.isRequired,
  GameUI: PropTypes.func.isRequired
}

export default Studio

