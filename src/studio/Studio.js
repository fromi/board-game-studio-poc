import React from 'react'
import {createStore} from "redux"
import {Provider} from 'react-redux'
import StudioTools from './StudioTools'
import PlayerViews from "./PlayerViews"
import StudioReducer from "./StudioReducer"
import './studio.css'

const Studio = ({game, ui}) => {
  return (
    <Provider store={createStore(StudioReducer)}>
      <StudioTools/>
      <PlayerViews ui={ui}/>
    </Provider>
  )
}

export default Studio