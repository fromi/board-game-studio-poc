import React from 'react'
import {CREATURE} from '@bga/not-alone'
import {CHOOSE_BOARD_SIDE} from '@bga/not-alone/moves/ChooseBoardSide'
import {Tooltip} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import './board.scss'
import RescueCounter from '../counters/RescueCounter'
import AssimilationCounter from '../counters/AssimilationCounter'
import {MOVE_ASSIMILATION_COUNTER} from '@bga/not-alone/moves/MoveAssimilationCounter'
import {MOVE_RESCUE_COUNTER} from '@bga/not-alone/moves/MoveRescueCounter'

export default function Board({game, playerId, animation, side, play}) {
  const animating = animation && animation.move.type === CHOOSE_BOARD_SIDE

  if (!animating && game.boardSide && game.boardSide !== side) {
    return null
  }

  const {t} = useTranslation()

  const classes = ['board', 'board-' + side]
  if (animating && animation.move.side !== side) {
    classes.push('removing')
  }

  const tooltip = side === 1 ?
    t('The Creature will have the Artemia token when Rescue counter is 6 spaces or less from victory.') :
    t('The Creature will have the Artemia token when Rescue counter is 1, 3, 5, 7, 9 or 11 spaces away from victory.')

  const onClick = () => {
    if (playerId === CREATURE && !game.boardSide && !animating) {
      play({type: CHOOSE_BOARD_SIDE, side})
    }
  }

  return (
    <Tooltip title={tooltip} enterTouchDelay={0}>
      <div className={classes.join(' ')} onClick={onClick}>
        <RescueCounter game={game} animation={animation}/>
        <AssimilationCounter game={game} animation={animation}/>
      </div>
    </Tooltip>
  )
}