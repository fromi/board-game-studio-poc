import React from "react"
import rescueCounter from "../img/rescue-counter.png"
import assimilationCounter from "../img/assimilation-counter.png"
import {CREATURE} from "@bga/not-alone"
import {CHOOSE_BOARD_SIDE} from "@bga/not-alone/moves/ChooseBoardSide"
import {Tooltip} from "@material-ui/core"
import {useTranslation} from "react-i18next"
import "./board.scss"

const Board = ({game, playerId, animation, side, play}) => {
  const animating = animation && animation.move.type === CHOOSE_BOARD_SIDE

  if (!animating && game.boardSide && game.boardSide !== side) {
    return null;
  }

  const {t} = useTranslation()

  const classes = ['board', 'board-' + side]
  if (animating && animation.move.side !== side) {
    classes.push('removing')
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
  if (game.boardSide && !animation) {
    if (playerId === CREATURE) {
      tooltip = t('Reach the star with the Assimilation counter before the Rescue counter does!')
    } else {
      tooltip = t('Reach the star with the Rescue counter before the Assimilation counter does!')
    }
  }

  const rescueCounterDescription = t('Rescue counter');
  const assimilationCounterDescription = t('Assimilation counter');

  return (
    <Tooltip title={tooltip} enterTouchDelay={0}>
      <div className={classes.join(' ')} onClick={onClick}>
        <Tooltip title={rescueCounterDescription} enterTouchDelay={0}>
          <img className="rescue-counter" src={rescueCounter} data-value={game.rescueCounter} alt={alt} draggable="false"/>
        </Tooltip>
        <Tooltip title={assimilationCounterDescription} enterTouchDelay={0}>
          <img className="assimilation-counter" src={assimilationCounter} data-value={game.assimilationCounter} alt={alt} draggable="false"/>
        </Tooltip>
      </div>
    </Tooltip>
  )
}

export default Board