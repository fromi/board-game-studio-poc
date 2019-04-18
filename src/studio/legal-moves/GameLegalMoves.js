import React from "react"
import {connect} from "react-redux"
import {List, ListSubheader} from '@material-ui/core'
import PlayerLegalMoves from "./PlayerLegalMoves"
import * as PropTypes from "prop-types"

const GameLegalMovesComponent = ({Game, game}) => {
  const playerIds = Game.getPlayerIds(game)
  return (
    <List subheader={
      <ListSubheader component="div">Legal moves at this state:</ListSubheader>}>
      {playerIds.map((playerId) =>
        <PlayerLegalMoves key={playerId} Game={Game} playerId={playerId}/>
      )}
    </List>
  )
}

const GameLegalMoves = connect(state => ({game: state.server.game}))(GameLegalMovesComponent)

GameLegalMoves.propTypes = {
  Game: PropTypes.object.isRequired
}

export default GameLegalMoves