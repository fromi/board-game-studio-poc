import React from 'react'
import SurvivalCard from './SurvivalCard'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'
import variables from '../../variables.scss'

const SurvivalCardsDeck = ({game}) => {
  const {t} = useTranslation()
  const slice = game.survivalCardsDeck.slice(-variables.decksMaxCardsDisplayed)
  return (
    <Tooltip title={t('Survival cards ({count, plural, one {one card} other {{count} cards}} left)', {count: game.survivalCardsDeck.length})}
             enterTouchDelay={0}>
      <div className="survival-cards-deck">
        {slice.map((card, index) => <SurvivalCard key={index}/>)}
      </div>
    </Tooltip>
  )
}

export default SurvivalCardsDeck