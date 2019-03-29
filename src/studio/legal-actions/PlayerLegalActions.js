import React from "react"
import {List, ListItem} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import {connect} from "react-redux"
import PlayableAction from "./PlayableAction"
import GamePropType from "../GamePropType"

const PlayerLegalActionsComponent = ({Game, game, player, dispatch}) => {
  const actions = Game.getLegalActions(game, player)
  if (actions.length === 0) {
    return null
  } else if (actions.length === 1) {
    const action = actions[0]
    return <PlayableAction text={player + ': ' + getText(action)} onPlay={() => playAction(Game, game, player, action, dispatch)}/>
  } else {
    return (
      <ListItem>
        <List subheader={
          <ListSubheader component="div">{player}:</ListSubheader>
        }>
          {actions.map((action, index) =>
            <PlayableAction key={index} text={getText(action)} onPlay={() => playAction(Game, game, player, action, dispatch)}/>
          )}
        </List>
      </ListItem>
    )
  }
}

const getText = (action) => action.data === undefined ? action.type : action.type + ' ' + action.data

const playAction = (Game, game, player, action, dispatch) => {
  action = Game.prepareRandomAction(game, {...action, player})
  const priorAction = Game.getPriorAction(game, action)
  if (priorAction) {
    dispatch(priorAction)
  }
  dispatch(action)
}

const PlayerLegalActions = connect(state => ({game: state.game}))(PlayerLegalActionsComponent)

PlayerLegalActions.propTypes = {
  Game: GamePropType.isRequired
}

export default PlayerLegalActions