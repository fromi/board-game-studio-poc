import React from "react"
import {connect} from "react-redux"
import {Button, List, ListItem} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {CANCEL_ACTION} from "./StudioActions"

const PastGameActionsComponent = ({Game, moveHistory, game, dispatch}) => (
  <List>
    {moveHistory.map((action, index) =>
      <ListItem key={index}>
        {JSON.stringify(action)}
        {Game.actions[action.type].cancelable(game, action) && <Button onClick={() => dispatch({type: CANCEL_ACTION, action})}>Cancel</Button>}
      </ListItem>
    )}
  </List>
)

const PastGameActions = connect(state => ({moveHistory: state.server.moveHistory, game: state.server.game}))(PastGameActionsComponent)

PastGameActions.propTypes = {
  Game: PropTypes.object.isRequired
}

export default PastGameActions