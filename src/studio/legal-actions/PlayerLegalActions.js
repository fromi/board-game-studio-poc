import React, {Component} from "react"
import {List, ListItem} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import {connect} from "react-redux"
import PlayableAction from "./PlayableAction"

class PlayerLegalActions extends Component {
  playAction(action) {
    action['player'] = this.props.player
    const preparedAction = this.props.game.prepareAction(action)
    this.props.dispatch(preparedAction)
    if (preparedAction.type !== action.type) // Action interrupted, retry
      this.playAction(action)
  }

  getText(action) {
    return action.data === undefined ? action.type : action.type + ' ' + action.data
  }

  render() {
    const actions = this.props.game.getLegalActions(this.props.player)
    if (actions.length === 0) {
      return null
    } else if (actions.length === 1) {
      const action = actions[0]
      return <PlayableAction text={this.props.player + ': ' + this.getText(action)} onPlay={() => this.playAction(action)}/>
    } else {
      return (
        <ListItem>
          <List subheader={
            <ListSubheader component="div">{this.props.player}:</ListSubheader>
          }>
            {actions.map((action, index) =>
              <PlayableAction key={index} text={this.getText(action)} onPlay={() => this.playAction(action)}/>
            )}
          </List>
        </ListItem>
      )
    }
  }
}

export default connect((state) => ({game: state.game}))(PlayerLegalActions)