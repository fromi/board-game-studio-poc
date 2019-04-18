import React from 'react'
import {Provider} from 'react-redux'
import GamePropType from "./GamePropType"
import StudioTools from './StudioTools'
import PlayerViews from "./PlayerViews"
import './studio.css'
import * as PropTypes from "prop-types"
import {applyMiddleware, combineReducers, createStore} from "redux"
import {studio} from "./reducers/StudioReducer"
import {automaticActionDispatchListener, createServerReducer} from "./reducers/ServerReducer"
import {createClientsReducer} from "./reducers/ClientsReducer"
import {NEW_GAME, PLAY_ACTION} from "./StudioActions"

const createPriorActionMiddleware = Game => store => next => action => {
  if (action.type === PLAY_ACTION) {
    const Action = Game.actions[action.action.type]
    const game = store.getState().server.game
    if (Action.hasPriorAction(action.action, game)) {
      action.action = Action.getPriorAction(game, action.action)
    }
  }
  return next(action)
}

const prepareActionMiddleware = Game => store => next => action => {
  if (action.type === PLAY_ACTION) {
    const Action = Game.actions[action.action.type]
    const game = store.getState().server.game
    action.action = Action.prepare(action.action, game, action.playerId)
  }
  return next(action)
}

const Studio = ({Game, GameUI}) => {
  const server = createServerReducer(Game)
  const clients = createClientsReducer(Game)
  const store = createStore(combineReducers({studio, server, clients}), applyMiddleware(createPriorActionMiddleware(Game), prepareActionMiddleware(Game)))
  store.subscribe(automaticActionDispatchListener(Game, store))
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