import React from 'react'
import {createStore} from "redux"
import {Provider} from 'react-redux'
import GamePropType from "./GamePropType"
import StudioTools from './StudioTools'
import PlayerViews from "./PlayerViews"
import createStudioReducer from "./StudioReducer"
import './studio.css'

const Studio = ({Game, GameUI}) => (
  <Provider store={createStore(createStudioReducer(Game))}>
    <StudioTools Game={Game}/>
    <PlayerViews GameUI={GameUI}/>
  </Provider>
)

Studio.propTypes = {
  Game: GamePropType.isRequired
}

export default Studio