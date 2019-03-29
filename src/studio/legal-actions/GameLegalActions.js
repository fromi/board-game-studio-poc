import React from "react"
import {connect} from "react-redux"
import {List, ListSubheader} from '@material-ui/core'
import PlayerLegalActions from "./PlayerLegalActions"
import GamePropType from "../GamePropType"

const GameLegalActionsComponent = ({Game, game}) => (
  <List subheader={
    <ListSubheader component="div">Legal actions at this state:</ListSubheader>}>
    {Game.getPlayerIds(game).map((playerId) =>
      <PlayerLegalActions key={playerId} Game={Game} playerId={playerId}/>
    )}
  </List>
)

const GameLegalActions = connect(state => ({game: state.game}))(GameLegalActionsComponent)

GameLegalActions.propTypes = {
  Game: GamePropType.isRequired
}

export default GameLegalActions