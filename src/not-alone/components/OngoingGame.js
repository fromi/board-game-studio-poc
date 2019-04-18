import React from 'react'
import Board from "./Board"
import "./ongoing-game.css"

const OngoingGame = ({game}) => (
  <div className="ongoing-game">
    <div className="game-zone"/>
    <Board side={game.boardSide} rotated={true}/>
  </div>
)

export default OngoingGame