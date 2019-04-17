import board1 from "../img/board_1.jpg"
import board1rotated from "../img/board_1_rotated.jpg"
import board2 from "../img/board_2.jpg"
import board2rotated from "../img/board_2_rotated.jpg"
import React from "react"

const Board = ({side, rotated = false, ...props}) => (
  <img className="board" src={side === 1 ? (rotated ? board1rotated : board1) : (rotated ? board2rotated : board2)} {...props}
       alt={side === 1 ? "The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory."
         : "The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory."}/>
)

export default Board