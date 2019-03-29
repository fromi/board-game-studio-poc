import React from "react"
import {connect} from 'react-redux'
import GameLegalActions from "./legal-actions/GameLegalActions"
import {Button, Typography} from '@material-ui/core'
import GamePropType from "./GamePropType"

const StudioToolsComponent = ({Game, game}) => (
  <div className="tools">
    <Typography variant="h3" gutterBottom>Studio tools</Typography>
    <Button onClick={() => console.log(game)}>Log game state</Button>
    <GameLegalActions Game={Game}/>
  </div>
)

const StudioTools = connect((state) => ({game: state.game}))(StudioToolsComponent)

StudioTools.propTypes = {
  Game: GamePropType.isRequired
}

export default StudioTools