import React from "react"
import * as PropTypes from "prop-types"
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline"

const PlayableMove = ({text, onPlay}) => (
  <ListItem button onClick={onPlay}>
    <ListItemIcon>
      <PlayCircleOutline/>
    </ListItemIcon>
    <ListItemText>{text}</ListItemText>
  </ListItem>
)

PlayableMove.propTypes = {
  text: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired
}

export default PlayableMove;