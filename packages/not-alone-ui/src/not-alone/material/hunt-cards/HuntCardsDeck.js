import React from 'react'
import HuntCard from './HuntCard'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'
import variables from '../../variables.scss'

export default function HuntCardsDeck({game}) {
  const {t} = useTranslation()
  const slice = game.huntCardsDeck.slice(-variables.decksMaxCardsDisplayed)
  return (
    <Tooltip title={t('Hunt cards ({count, plural, one {one card} other {{count} cards}} left)', {count: game.huntCardsDeck.length})} enterTouchDelay={0}>
      <div className="hunt-cards-deck">
        {slice.map((card, index) => <HuntCard key={index}/>)}
      </div>
    </Tooltip>
  )
}