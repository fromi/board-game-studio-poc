import React from "react"
import board1 from "../img/board-1.jpg"
import board2 from "../img/board-2.jpg"
import {CREATURE} from "../NotAlone"
import "./board.css"
import {CHOOSE_BOARD_SIDE} from "../moves/ChooseBoardSide"

const Board = ({game, playerId, animation, side, play}) => {
  const animating = animation && animation.move.type === CHOOSE_BOARD_SIDE
  const sideNotChosen = game.boardSide && game.boardSide !== side

  if (sideNotChosen && !animating) {
    return null;
  }

  const alt = side === 1 ?
    "The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory." :
    "The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory."

  const onClick = () => {
    if (playerId === CREATURE && !game.boardSide && !animating) {
      play({type: 'ChooseBoardSide', side})
    }
  }

  return <img className={`board board${side} ${sideNotChosen ? 'not-chosen' : ''}`}
              onClick={onClick} src={side === 1 ? board1 : board2} alt={alt} draggable="false"/>
}

export default Board