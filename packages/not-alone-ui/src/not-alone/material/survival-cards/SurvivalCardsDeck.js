import React from 'react'
import SurvivalCard from './SurvivalCard'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../../variables.scss')
const maxCardsDisplayed = style.global['$decks-max-cards-displayed'].value

const SurvivalCardsDeck = ({game}) => {
  const {t} = useTranslation()
  const slice = game.survivalCardsDeck.slice(-maxCardsDisplayed)
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