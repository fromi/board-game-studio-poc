import React from "react"
import {List, ListItem} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import {connect} from "react-redux"
import PlayableAction from "./PlayableAction"
import * as PropTypes from "prop-types"

const PlayerLegalActionsComponent = ({gameEngine, game, playerId}) => {
  const actions = gameEngine.getMandatoryActions(game, playerId)
  if (actions.length === 0) {
    return null
  } else {
    return (
      <ListItem>
        <List subheader={
          <ListSubheader component="div">{playerId}:</ListSubheader>
        }>
          {actions.map((action, index) =>
            <PlayableAction key={index} text={JSON.stringify(action)} onPlay={() => gameEngine.playAction(action, game, playerId)}/>
          )}
        </List>
      </ListItem>
    )
  }
}

const PlayerLegalActions = connect(state => ({game: state.game}))(PlayerLegalActionsComponent)

PlayerLegalActions.propTypes = {
  gameEngine: PropTypes.object.isRequired,
  playerId: PropTypes.string.isRequired
}

export default PlayerLegalActions