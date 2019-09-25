import React from 'react'
import SurvivalCard from './SurvivalCard'
import Tooltip from '@material-ui/core/Tooltip'
import {useTranslation} from 'react-i18next'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import {CREATURE, getHuntedNumber} from '@bga/not-alone'
import {numberOfHuntedAndHuntedPositionToTableSeats, numberOfHuntedToTableSeatsForCreature} from './other-players/OtherPlayers'

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss')
const maxCardsDisplayed = style.global['$decks-max-cards-displayed'].value

const SurvivalCardsDeck = ({game, playerId, animation}) => {
  const {t} = useTranslation()
  const isDrawingSurvivalCard = animation && animation.move.type === DRAW_SURVIVAL_CARD
  const slice = game.survivalCardsDeck.slice(-maxCardsDisplayed)
  return (
    <Tooltip title={t('Survival cards ({count, plural, one {one card} other {{count} cards}} left)', {count: game.survivalCardsDeck.length})}
             enterTouchDelay={0}>
      <div className="survival-cards-deck">
        {slice.map((card, index) => {
          const classes = []
          const cardNumber = game.survivalCardsDeck.length - slice.length + index + 1
          if (cardNumber === game.survivalCardsDeck.length && isDrawingSurvivalCard && playerId && playerId !== animation.move.huntedId) {
            if (!playerId || playerId === CREATURE) {
              const huntedNumber = getHuntedNumber(animation.move.huntedId)
              classes.push('drawing', ...numberOfHuntedToTableSeatsForCreature[game.hunted.length][huntedNumber - 1])
            } else {
              const huntedNumber = getHuntedNumber(playerId)
              const otherHuntedNumber = getHuntedNumber(animation.move.huntedId)
              const tableSeats = numberOfHuntedAndHuntedPositionToTableSeats[game.hunted.length][huntedNumber]
              const seat = otherHuntedNumber < huntedNumber ? tableSeats[otherHuntedNumber] : tableSeats[otherHuntedNumber - 1]
              classes.push('drawing', ...seat)
            }
          }
          return <SurvivalCard key={cardNumber} classes={classes}/>
        })}
      </div>
    </Tooltip>
  )
}

export default SurvivalCardsDeck