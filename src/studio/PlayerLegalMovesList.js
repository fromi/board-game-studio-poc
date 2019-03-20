import React, {Component} from "react"
import SingleTypeOfMovesList from "./SingleTypeOfMovesList"
import {List, ListItem} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import {connect} from "react-redux"
import MoveRegistry from "../game-api/MoveRegistry"
import PlayableMove from "./PlayableMove"

class PlayerLegalMovesList extends Component {
  render() {
    const moves = this.props.game.getLegalMoves(this.props.player)
    if (typeof moves === "object" && Object.keys(moves).length > 0) {
      return (
        <ListItem>
          <List subheader={
            <ListSubheader component="div">{this.props.player}:</ListSubheader>
          }>
            {Object.keys(moves).map((type) =>
              <SingleTypeOfMovesList key={type} type={type} moves={moves[type]}
                                     onPlay={(move) => this.props.dispatch(MoveRegistry.createAction(this.props.game, type, move))}/>
            )}
          </List>
        </ListItem>
      )
    } else if (typeof moves === "string") {
      return <PlayableMove text={this.props.player + ': ' + moves} onPlay={() => this.props.dispatch(MoveRegistry.createAction(this.props.game, moves))}/>
    } else {
      return null
    }
  }
}

export default connect((state) => ({game: state.game}))(PlayerLegalMovesList)