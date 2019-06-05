import React from "react"
import board1 from "../img/board_1.jpg"
import board2 from "../img/board_2.jpg"
import {CREATURE} from "../NotAlone"
import "./board.css"

const Board = ({game, player, side, play}) => {
  const alt = side === 1 ?
    "The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory." :
    "The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory."
  if (game.boardSide === side) {
    return <img className="board" src={side === 1 ? board1 : board2} alt={alt}/>
  } else if (!game.boardSide) {
    if (player === CREATURE) {
      return <img className={`board board${side} choice selectable`} alt={alt}
                  onClick={() => play({type: 'ChooseBoardSide', side})} src={side === 1 ? board1 : board2}/>
    } else {
      return <img className="board choice" src={side === 1 ? board1 : board2} alt={alt}/>
    }
  } else {
    return null
  }
}

export default Board