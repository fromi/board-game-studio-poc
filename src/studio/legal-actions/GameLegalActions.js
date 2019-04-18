import React from "react"
import {connect} from "react-redux"
import {List, ListSubheader} from '@material-ui/core'
import PlayerLegalActions from "./PlayerLegalActions"
import * as PropTypes from "prop-types"

const GameLegalActionsComponent = ({Game, game}) => {
  const playerIds = Game.getPlayerIds(game)
  return (
    <List subheader={
      <ListSubheader component="div">Legal actions at this state:</ListSubheader>}>
      {playerIds.map((playerId) =>
        <PlayerLegalActions key={playerId} Game={Game} playerId={playerId}/>
      )}
    </List>
  )
}

const GameLegalActions = connect(state => ({game: state.server.game}))(GameLegalActionsComponent)

GameLegalActions.propTypes = {
  Game: PropTypes.object.isRequired
}

export default GameLegalActions