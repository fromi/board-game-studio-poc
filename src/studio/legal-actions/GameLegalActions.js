import React, {Component} from "react"
import {List, ListSubheader} from '@material-ui/core'
import PlayerLegalMovesList from "./PlayerLegalActions"
import {connect} from "react-redux"

class GameLegalActions extends Component {
  render() {
    return (
      <List subheader={
        <ListSubheader component="div">Legal actions at this state:</ListSubheader>
      }>
        {this.props.game.getPlayerIds().map((player) =>
            <PlayerLegalMovesList key={player} player={player}/>
        )}
      </List>
    )
  }
}

export default connect((state) => state)(GameLegalActions)