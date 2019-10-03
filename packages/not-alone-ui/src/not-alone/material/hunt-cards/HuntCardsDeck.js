import React from 'react'
import HuntCard from './HuntCard'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../../variables.scss')
const maxCardsDisplayed = style.global['$decks-max-cards-displayed'].value

const HuntCardsDeck = ({game}) => {
  const {t} = useTranslation()
  const slice = game.huntCardsDeck.slice(-maxCardsDisplayed)
  return (
    <Tooltip title={t('Hunt cards ({count, plural, one {one card} other {{count} cards}} left)', {count: game.huntCardsDeck.length})} enterTouchDelay={0}>
      <div className="hunt-cards-deck">
        {slice.map((card, index) => <HuntCard key={index}/>)}
      </div>
    </Tooltip>
  )
}

export default HuntCardsDeck