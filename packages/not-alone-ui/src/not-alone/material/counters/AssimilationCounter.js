import assimilationCounter from './assimilation-counter.png'
import React, {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {Tooltip} from '@material-ui/core'
import {MOVE_ASSIMILATION_COUNTER} from '@bga/not-alone/moves/MoveAssimilationCounter'
import assimilationCounterSound from './assimilation-counter.mp3'

export default function AssimilationCounter({game, animation}) {
  const {t} = useTranslation()
  const moving = animation && animation.move.type === MOVE_ASSIMILATION_COUNTER
  const audio = new Audio(assimilationCounterSound);
  useEffect(() => {
    if (moving) {
      audio.play()
    }
  })
  return (
    <Tooltip title={t('Assimilation counter')} enterTouchDelay={0}>
      <img className={`assimilation-counter ${moving ? 'moving' : ''}`} src={assimilationCounter} data-value={game.assimilationCounter}
           alt={t('A cylindrical purple counter representing the Assimilation counter')} draggable="false"/>
    </Tooltip>)
}