import React from 'react'
import Typography from '@material-ui/core/Typography'
import "./not-alone.css"
import {BOARD_SIDES, CREATURE} from "./NotAlone"
import Board from "./components/Board"
import {CHOOSE_BOARD_SIDE} from "./moves/ChooseBoardSide"
import Artemia from "./components/Artemia"
import HuntCardsDeck from "./components/HuntCardsDeck"
import Hand from "./components/Hand"
import {DRAW_HUNT_CARD} from "./moves/DrawHuntCard"

export const Interface = (props) => {
  const {playerId, game, animation} = props
  const userType = playerId ? (playerId === CREATURE ? 'creature' : 'hunted') : 'spectator'
  const boardSideChosen = game.boardSide || (animation && animation.move.type === CHOOSE_BOARD_SIDE)
  return (
    <div className={`not-alone ${userType}`}>
      <Typography className="information" align="center" variant="title">{
        playerId === CREATURE ? "You are the Creature. Please choose the board side." : "... is the Creature."
      }</Typography>
      {BOARD_SIDES.map(side =>
        <Board side={side} key={side} {...props}/>
      )}
      {boardSideChosen && <HuntCardsDeck {...props}/>}
      {boardSideChosen && <Artemia {...props}/>}
      {boardSideChosen && playerId && <Hand {...props}/>}
    </div>
  )
}

export const getPreAnimationDelay = (move) => {
  switch (move.type) {
    case CHOOSE_BOARD_SIDE:
      return 1
    default:
      return 0
  }
}

export const getAnimationDelay = (move) => {
  switch (move.type) {
    case CHOOSE_BOARD_SIDE:
      return 1
    case DRAW_HUNT_CARD:
      return 1
    default:
      return 0
  }
}