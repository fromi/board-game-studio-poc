import React, {Component} from "react"
import {List, ListSubheader} from '@material-ui/core'
import PlayerLegalMovesList from "./PlayerLegalMovesList"
import {connect} from "react-redux"

class LegalMovesList extends Component {
  render() {
    return (
      <List subheader={
        <ListSubheader component="div">Legal moves at this state:</ListSubheader>
      }>
        {this.props.game.getPlayers().map((player) =>
            <PlayerLegalMovesList key={player} player={player}/>
        )}
      </List>
    )
  }
}

export default connect((state) => state)(LegalMovesList)