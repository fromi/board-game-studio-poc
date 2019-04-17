import React from 'react'
import Board from "./Board"
import "./ongoing-game.css"

const OngoingGame = ({game}) => (
  <div className="ongoing-game">
    <div className="game-zone"/>
    <div className="board-wrapper">
      <Board side={game.boardSide} rotated={true}/>
    </div>
  </div>
)

export default OngoingGame