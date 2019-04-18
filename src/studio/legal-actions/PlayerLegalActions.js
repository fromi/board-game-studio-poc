import React from "react"
import {List, ListItem} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import {connect} from "react-redux"
import PlayableAction from "./PlayableAction"
import * as PropTypes from "prop-types"
import {PLAY_ACTION} from "../StudioActions"

const PlayerLegalActionsComponent = ({Game, game, playerId, dispatch}) => {
  const actions = Game.getMandatoryActions(game, playerId).concat(Game.getOptionalActions(game, playerId))
  if (actions.length === 0) {
    return null
  } else {
    return (
      <ListItem>
        <List subheader={
          <ListSubheader component="div">{playerId}:</ListSubheader>
        }>
          {actions.map((action, index) =>
            <PlayableAction key={index} text={JSON.stringify(action)} onPlay={() => dispatch({type: PLAY_ACTION, playerId, action})}/>
          )}
        </List>
      </ListItem>
    )
  }
}

const PlayerLegalActions = connect(state => ({game: state.server.game}))(PlayerLegalActionsComponent)

PlayerLegalActions.propTypes = {
  Game: PropTypes.object.isRequired,
  playerId: PropTypes.string.isRequired
}

export default PlayerLegalActions