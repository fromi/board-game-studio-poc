import React from 'react'
import "./not-alone.css"
import {BOARD_SIDES, CREATURE} from "./NotAlone"
import Board from "./components/Board"
import {CHOOSE_BOARD_SIDE} from "./moves/ChooseBoardSide"
import Artemia from "./components/Artemia"
import HuntCardsDeck from "./components/HuntCardsDeck"
import Hand from "./components/Hand"
import {DRAW_HUNT_CARD} from "./moves/DrawHuntCard"
import SurvivalCardsDeck from "./components/SurvivalCardsDeck"
import HuntedPlayer from "./components/HuntedPlayer"

export const Interface = (props) => {
  const {playerId, game, animation} = props
  const userType = playerId ? (playerId === CREATURE ? 'creature' : 'hunted') : 'spectator'
  const boardSideChosen = animation && animation.move.type === CHOOSE_BOARD_SIDE
  return (
    <div className={`not-alone ${userType} ${!game.boardSide ? 'board-side-choice' : ''} ${boardSideChosen ? 'board-side-chosen' : ''}`}>
      <h2 className="information">{
        playerId === CREATURE ? "You are the Creature. Please choose the board side." : "... is the Creature."
      }</h2>
      {BOARD_SIDES.map(side =>
        <Board side={side} key={side} {...props}/>
      )}
      {<HuntCardsDeck {...props}/>}
      {<SurvivalCardsDeck {...props}/>}
      {<Artemia {...props}/>}
      <div>{game.hunted.map((hunted, index) => <HuntedPlayer hunted={hunted} key={index} {...props}/>)}</div>
      {playerId && <Hand {...props}/>}
    </div>
  )
}

export const getAnimationDelay = (move) => {
  switch (move.type) {
    case CHOOSE_BOARD_SIDE:
      return 2
    case DRAW_HUNT_CARD:
      return 1
    default:
      return 0
  }
}