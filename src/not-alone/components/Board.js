import React from "react"
import board1 from "../img/board_1.jpg"
import board2 from "../img/board_2.jpg"
import {CREATURE} from "../NotAlone"
import "./board.css"
import {CHOOSE_BOARD_SIDE} from "../moves/ChooseBoardSide"

const Board = ({game, playerId, transitions, side, play}) => {
  if (game.boardSide && game.boardSide !== side) {
    return null;
  }
  const chosenSide = transitions.length && transitions[0].move.type === CHOOSE_BOARD_SIDE && transitions[0].move.side
  const alt = side === 1 ?
    "The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory." :
    "The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory."
  let classes = ['board']
  const onClick = () => {
    if (!game.boardSide && !chosenSide && playerId === CREATURE) {
      play({type: 'ChooseBoardSide', side})
    }
  }
  if (!game.boardSide && chosenSide !== side) {
    classes.push('board' + side, 'choice')
    if (playerId === CREATURE && !chosenSide) {
      classes.push('selectable')
    } else if (chosenSide) {
      classes.push('not-chosen')
    }
  }
  return <img className={classes.join(' ')} onClick={onClick} src={side === 1 ? board1 : board2} alt={alt} draggable="false"/>
}

export default Board