import React from "react"
import "./board-side-choice.css"
import Board from "./Board"

const BoardSideChoice = ({play}) => (
  <div className="board-side-choice">
    <Board side={1} className="button" tabIndex={0} onClick={() => play({type: 'ChooseBoardSide', side: 1})}/>
    <Board side={2} className="button" tabIndex={0} onClick={() => play({type: 'ChooseBoardSide', side: 2})}/>
  </div>
)

export default BoardSideChoice