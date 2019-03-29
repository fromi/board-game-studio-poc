import React from 'react'
import {Provider} from 'react-redux'
import GamePropType from "./GamePropType"
import StudioTools from './StudioTools'
import PlayerViews from "./PlayerViews"
import './studio.css'
import GameEngine from "../game-engine/GameEngine"
import * as PropTypes from "prop-types"

const Studio = ({Game, GameUI}) => {
  const gameEngine = new GameEngine(Game)
  return (
    <Provider store={gameEngine.store}>
      <StudioTools gameEngine={gameEngine}/>
      <PlayerViews GameUI={GameUI}/>
    </Provider>
  )
}

Studio.propTypes = {
  Game: GamePropType.isRequired,
  GameUI: PropTypes.func.isRequired
}

export default Studio