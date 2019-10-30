import rescueCounter from './rescue-counter.png'
import React, {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {Tooltip} from '@material-ui/core'
import {MOVE_RESCUE_COUNTER} from '@bga/not-alone/moves/MoveRescueCounter'
import rescueCounterSound from './rescue-counter.mp3'

export default function RescueCounter({game, animation}) {
  const {t} = useTranslation()
  const moving = animation && animation.move.type === MOVE_RESCUE_COUNTER
  const audio = new Audio(rescueCounterSound);
  useEffect(() => {
    if (moving) {
      audio.play()
    }
  })
  return (
    <Tooltip title={t('Rescue counter')} enterTouchDelay={0}>
      <img className={`rescue-counter ${moving ? 'moving' : ''}`} src={rescueCounter} data-value={game.rescueCounter}
           alt={t('A cylindrical blue counter representing the Rescue counter')} draggable="false"/>
    </Tooltip>
  )
}