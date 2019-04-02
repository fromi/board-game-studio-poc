import React from "react"
import {connect} from "react-redux"
import {Button, List, ListItem} from "@material-ui/core"
import * as PropTypes from "prop-types"

const PastGameActionsComponent = ({gameEngine, pastActions, game, dispatch}) => (
  <List>
    {pastActions.map((action, index) =>
      <ListItem key={index}>
        {JSON.stringify(action)}
        {gameEngine.getAction(action.type).cancelable(game, action) && <Button onClick={() => dispatch({type: 'CANCEL_ACTION', action})}>Cancel</Button>}
      </ListItem>
    )}
  </List>
)

const PastGameActions = connect(state => ({pastActions: state.pastGameActions, game: state.game}))(PastGameActionsComponent)

PastGameActions.propTypes = {
  gameEngine: PropTypes.object.isRequired
}

export default PastGameActions