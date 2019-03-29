import React from "react"
import {connect} from 'react-redux'
import GameLegalActions from "./legal-actions/GameLegalActions"
import {Button, Typography} from '@material-ui/core'
import * as PropTypes from "prop-types"

const StudioToolsComponent = ({gameEngine, game}) => (
  <div className="tools">
    <Typography variant="h3" gutterBottom>Studio tools</Typography>
    <Button onClick={() => console.log(game)}>Log game state</Button>
    <GameLegalActions gameEngine={gameEngine}/>
  </div>
)

const StudioTools = connect((state) => ({game: state.game}))(StudioToolsComponent)

StudioTools.propTypes = {
  gameEngine: PropTypes.object.isRequired
}.isRequired

export default StudioTools