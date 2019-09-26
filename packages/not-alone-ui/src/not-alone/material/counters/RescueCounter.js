import rescueCounter from './rescue-counter.png'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {Tooltip} from '@material-ui/core'

const RescueCounter = ({game}) => {
  const {t} = useTranslation()
  return (
    <Tooltip title={t('Rescue counter')} enterTouchDelay={0}>
      <img className="rescue-counter" src={rescueCounter} data-value={game.rescueCounter}
           alt={t('A cylindrical blue counter representing the Rescue counter')} draggable="false"/>
    </Tooltip>
  )
}
export default RescueCounter