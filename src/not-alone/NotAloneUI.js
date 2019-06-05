import React from 'react'
import Typography from '@material-ui/core/Typography'
import "./not-alone.css"
import {BOARD_SIDES, CREATURE} from "./NotAlone"
import Board from "./components/Board"

const NotAloneUI = (props) => {
  const {player} = props
  const userType = player ? (player === CREATURE ? 'creature' : 'hunted') : 'spectator'
  return (
    <div className={`not-alone ${userType}`}>
      <Typography className="information" align="center" variant="title">{
        player === CREATURE ? "You are the Creature. Please choose the board side." : "... is the Creature."
      }</Typography>
      {BOARD_SIDES.map(side =>
        <Board side={side} key={side} {...props}/>
      )}
    </div>
  )
}

export default NotAloneUI