import React from "react"
import {connect} from "react-redux"
import {List, ListSubheader} from '@material-ui/core'
import PlayerLegalActions from "./PlayerLegalActions"
import * as PropTypes from "prop-types"

const GameLegalActionsComponent = ({gameEngine, game}) => (
  <List subheader={
    <ListSubheader component="div">Legal actions at this state:</ListSubheader>}>
    {gameEngine.getPlayerIds(game).map((playerId) =>
      <PlayerLegalActions key={playerId} gameEngine={gameEngine} playerId={playerId}/>
    )}
  </List>
)

const GameLegalActions = connect(state => ({game: state.game}))(GameLegalActionsComponent)

GameLegalActions.propTypes = {
  gameEngine: PropTypes.object.isRequired
}

export default GameLegalActions