import React from "react"
import {connect} from "react-redux"
import {Button, List, ListItem} from "@material-ui/core"
import * as PropTypes from "prop-types"
import {CANCEL_MOVE} from "./StudioActions"

const isCancelable = (Move, game, move) => Move.cancelable && Move.cancelable(game, move)

const MoveHistoryComponent = ({Game, moveHistory, game, dispatch}) => (
  <List>
    {moveHistory.map((move, index) =>
      <ListItem key={index}>
        {JSON.stringify(move)}
        {isCancelable(Game.moves[move.type], game, move) && <Button onClick={() => dispatch({type: CANCEL_MOVE, move})}>Cancel</Button>}
      </ListItem>
    )}
  </List>
)

const MoveHistory = connect(state => ({moveHistory: state.server.moveHistory, game: state.server.game}))(MoveHistoryComponent)

MoveHistory.propTypes = {
  Game: PropTypes.object.isRequired
}

export default MoveHistory