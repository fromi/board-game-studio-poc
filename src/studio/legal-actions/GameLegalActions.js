import React from "react"
import {List, ListSubheader} from '@material-ui/core'
import PlayerLegalMovesList from "./PlayerLegalActions"
import {connect} from "react-redux"

const GameLegalActions = ({game}) => (
  <List subheader={
    <ListSubheader component="div">Legal actions at this state:</ListSubheader>}>
    {game.getPlayerIds().map((player) =>
      <PlayerLegalMovesList key={player} player={player}/>
    )}
  </List>
)

export default connect(state => ({game: state.game}))(GameLegalActions)