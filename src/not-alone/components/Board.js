import React from "react"
import board1 from "../img/board-1.jpg"
import board2 from "../img/board-2.jpg"
import {CREATURE} from "../NotAlone"
import "./board.css"
import {CHOOSE_BOARD_SIDE} from "../moves/ChooseBoardSide"
import {Tooltip} from "@material-ui/core"
import {useTranslation} from "react-i18next"

const Board = ({game, playerId, animation, side, play}) => {
  const {t} = useTranslation()
  const animating = animation && animation.move.type === CHOOSE_BOARD_SIDE
  const sideNotChosen = game.boardSide && game.boardSide !== side

  if (sideNotChosen && !animating) {
    return null;
  }

  const alt = side === 1 ?
    t('The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory.') :
    t('The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory.')

  const onClick = () => {
    if (playerId === CREATURE && !game.boardSide && !animating) {
      play({type: CHOOSE_BOARD_SIDE, side})
    }
  }

  let tooltip = ''
  if (!sideNotChosen && !animation) {
    if (playerId === CREATURE) {
      tooltip = t('Reach the star with the Assimilation counter before the Rescue counter does!')
    } else {
      tooltip = t('Reach the star with the Rescue counter before the Assimilation counter does!')
    }
  }

  return <Tooltip title={tooltip} enterTouchDelay={0}>
    <img className={`board board${side} ${sideNotChosen ? 'not-chosen' : ''}`}
              onClick={onClick} src={side === 1 ? board1 : board2} alt={alt} draggable="false"/>
  </Tooltip>
}

export default Board