import React from "react"
import {List, ListItem} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import {connect} from "react-redux"
import PlayableAction from "./PlayableAction"

const PlayerLegalActions = ({game, player, dispatch}) => {
  const actions = game.getLegalActions(player)
  if (actions.length === 0) {
    return null
  } else if (actions.length === 1) {
    const action = actions[0]
    return <PlayableAction text={player + ': ' + getText(action)} onPlay={() => playAction(game, player, action, dispatch)}/>
  } else {
    return (
      <ListItem>
        <List subheader={
          <ListSubheader component="div">{player}:</ListSubheader>
        }>
          {actions.map((action, index) =>
            <PlayableAction key={index} text={getText(action)} onPlay={() => playAction(game, player, action, dispatch)}/>
          )}
        </List>
      </ListItem>
    )
  }
}

const getText = (action) => action.data === undefined ? action.type : action.type + ' ' + action.data

const playAction = (game, player, action, dispatch) => {
  action = game.prepareRandomAction({...action, player})
  const priorAction = game.getPriorAction(action)
  if (priorAction) {
    dispatch(priorAction)
  }
  dispatch(action)
}

export default connect(state => ({game: state.game}))(PlayerLegalActions)