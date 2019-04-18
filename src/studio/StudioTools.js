import React from "react"
import {connect} from 'react-redux'
import GameLegalMoves from "./legal-moves/GameLegalMoves"
import {Button, Typography} from '@material-ui/core'
import * as PropTypes from "prop-types"
import MoveHistory from "./MoveHistory"

const StudioToolsComponent = ({Game, game}) => (
  <div className="tools">
    <Typography variant="h3" gutterBottom>Studio tools</Typography>
    <Button onClick={() => console.log(game)}>Log game state</Button>
    <GameLegalMoves Game={Game}/>
    <MoveHistory Game={Game}/>
  </div>
)

const StudioTools = connect((state) => ({game: state.server.game}))(StudioToolsComponent)

StudioTools.propTypes = {
  Game: PropTypes.object.isRequired
}.isRequired

export default StudioTools