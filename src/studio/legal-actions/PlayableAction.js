import React, {Component} from "react"
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline"

export default class PlayableAction extends Component {
  render() {
    return (
      <ListItem button onClick={this.props.onPlay}>
        <ListItemIcon>
          <PlayCircleOutline/>
        </ListItemIcon>
        <ListItemText>{this.props.text}</ListItemText>
      </ListItem>
    )
  }
}