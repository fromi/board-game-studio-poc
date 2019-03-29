import React from "react"
import {List, ListItem} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import {connect} from "react-redux"
import PlayableAction from "./PlayableAction"
import GamePropType from "../GamePropType"
import * as PropTypes from "prop-types"
import {playAction} from "../../game-api/Action"

const PlayerLegalActionsComponent = ({Game, game, playerId, dispatch}) => {
  const actions = Game.getLegalActions(game, playerId)
  if (actions.length === 0) {
    return null
  } else {
    return (
      <ListItem>
        <List subheader={
          <ListSubheader component="div">{playerId}:</ListSubheader>
        }>
          {actions.map((action, index) =>
            <PlayableAction key={index} text={JSON.stringify(action)} onPlay={() => playAction(Game, game, playerId, action, dispatch)}/>
          )}
        </List>
      </ListItem>
    )
  }
}

const PlayerLegalActions = connect(state => ({game: state.game}))(PlayerLegalActionsComponent)

PlayerLegalActions.propTypes = {
  Game: GamePropType.isRequired,
  playerId: PropTypes.string.isRequired
}

export default PlayerLegalActions