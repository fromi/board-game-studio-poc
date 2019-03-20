import React, {Component} from "react"
import {List, ListSubheader} from "@material-ui/core"
import PlayableMove from "./PlayableMove"

export default class SingleTypeOfMovesList extends Component {
  render() {
    if (this.props.moves.length === 1) {
      return <PlayableMove text={JSON.stringify(this.props.moves[0])} onPlay={() => this.props.onPlay(this.props.moves[0])}/>
    } else {
      return (
        <List subheader={<ListSubheader component="div">{this.props.type}:</ListSubheader>}>
          {this.props.moves.map((move, i) =>
            <PlayableMove key={i} text={JSON.stringify(move)} onPlay={() => this.props.onPlay(move)}/>
          )}
        </List>
      )
    }
  }
}