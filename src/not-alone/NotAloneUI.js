import React from 'react'
import Typography from '@material-ui/core/Typography'
import "./not-alone.css"
import {BOARD_SIDES, CREATURE} from "./NotAlone"
import Board from "./components/Board"
import {CHOOSE_BOARD_SIDE} from "./moves/ChooseBoardSide"

export const Interface = (props) => {
  const {playerId} = props
  const userType = playerId ? (playerId === CREATURE ? 'creature' : 'hunted') : 'spectator'
  return (
    <div className={`not-alone ${userType}`}>
      <Typography className="information" align="center" variant="title">{
        playerId === CREATURE ? "You are the Creature. Please choose the board side." : "... is the Creature."
      }</Typography>
      {BOARD_SIDES.map(side =>
        <Board side={side} key={side} {...props}/>
      )}
    </div>
  )
}

export const getMoveAnimationDelay = ({move}) => {
  switch (move.type) {
    case CHOOSE_BOARD_SIDE:
      return 1
    default:
      return 0
  }
}