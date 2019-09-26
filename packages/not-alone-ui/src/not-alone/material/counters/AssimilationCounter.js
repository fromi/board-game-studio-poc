import assimilationCounter from './assimilation-counter.png'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {Tooltip} from '@material-ui/core'

const AssimilationCounter = ({game}) => {
  const {t} = useTranslation()
  return (
    <Tooltip title={t('Assimilation counter')} enterTouchDelay={0}>
      <img className="assimilation-counter" src={assimilationCounter} data-value={game.assimilationCounter}
              alt={t('A cylindrical purple counter representing the Assimilation counter')} draggable="false"/>
    </Tooltip>)
}
export default AssimilationCounter