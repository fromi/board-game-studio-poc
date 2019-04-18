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
import {NEW_GAME, PLAY_MOVE} from "./StudioActions"

const createPriorMoveMiddleware = Game => store => next => action => {
  if (action.type === PLAY_MOVE) {
    const Move = Game.moves[action.move.type]
    const game = store.getState().server.game
    if (Move.hasPriorMove && Move.hasPriorMove(action.move, game)) {
      action.move = Move.getPriorMove(game, action.move)
    }
  }
  return next(action)
}

const prepareMoveMiddleware = Game => store => next => action => {
  if (action.type === PLAY_MOVE) {
    const Move = Game.moves[action.move.type]
    const game = store.getState().server.game
    if (Move.prepare) {
      action.move = Move.prepare(action.move, game, action.playerId)
    } else if (action.playerId) {
      action.move = {...action.move, playerId: action.playerId}
    }
  }
  return next(action)
}

const Studio = ({Game, GameUI}) => {
  const server = createServerReducer(Game)
  const clients = createClientsReducer(Game)
  const store = createStore(combineReducers({studio, server, clients}), applyMiddleware(createPriorMoveMiddleware(Game), prepareMoveMiddleware(Game)))
  store.subscribe(automaticMovesListener(Game, store))
  store.dispatch({type: NEW_GAME, game: Game.setup({numberOfPlayers: 3})})
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