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
import {NEW_GAME} from "./StudioActions"
import {priorMoveMiddleware} from "./middleware/PriorMoveMiddleware"
import {prepareMoveMiddleware} from "./middleware/PrepareMoveMiddleware"

const Studio = ({Game, GameUI}) => {
  const server = createServerReducer(Game)
  const clients = createClientsReducer(Game)
  const store = createStore(combineReducers({studio, server, clients}),
    applyMiddleware(priorMoveMiddleware(Game), prepareMoveMiddleware(Game)))
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