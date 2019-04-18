import React from "react"
import {List, ListItem} from "@material-ui/core"
import ListSubheader from "@material-ui/core/ListSubheader"
import {connect} from "react-redux"
import PlayableMove from "./PlayableMove"
import * as PropTypes from "prop-types"
import {PLAY_MOVE} from "../StudioActions"

const PlayerLegalMovesComponent = ({Game, game, playerId, dispatch}) => {
  const moves = Game.getMandatoryMoves(game, playerId).concat(Game.getOptionalMoves(game, playerId))
  if (moves.length === 0) {
    return null
  } else {
    return (
      <ListItem>
        <List subheader={
          <ListSubheader component="div">{playerId}:</ListSubheader>
        }>
          {moves.map((move, index) =>
            <PlayableMove key={index} text={JSON.stringify(move)} onPlay={() => dispatch({type: PLAY_MOVE, playerId, move})}/>
          )}
        </List>
      </ListItem>
    )
  }
}

const PlayerLegalMoves = connect(state => ({game: state.server.game}))(PlayerLegalMovesComponent)

PlayerLegalMoves.propTypes = {
  Game: PropTypes.object.isRequired,
  playerId: PropTypes.string.isRequired
}

export default PlayerLegalMoves