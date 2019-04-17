import React from 'react'
import Typography from '@material-ui/core/Typography'
import "./not-alone.css"
import {CREATURE} from "./NotAlone"
import BoardSideChoice from "./components/BoardSideChoice"
import OngoingGame from "./components/OngoingGame"

const NotAloneUI = ({game, player, play}) => (
  <div className="not-alone">
    <Typography className="information" align="center" variant="title">{
      player === CREATURE ? "You are the Creature. Please choose the board side." : "... is the Creature."
    }</Typography>
    {game.boardSide ? <OngoingGame game={game}/> : <BoardSideChoice play={play}/>}
  </div>
)

export default NotAloneUI