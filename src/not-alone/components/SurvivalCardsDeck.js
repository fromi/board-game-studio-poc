import React from "react"
import SurvivalCard from "./SurvivalCard"
import Tooltip from '@material-ui/core/Tooltip';
import {useTranslation} from 'react-i18next';
import {DRAW_SURVIVAL_CARD} from "../moves/DrawSurvivalCard"
import {CREATURE, getHuntedNumber} from "../NotAlone"
import {numberOfHuntedAndHuntedPositionToTableSeats, numberOfHuntedToTableSeatsForCreature} from "./OtherPlayers"

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');
const maxCardsDisplayed = style.global['$decks-max-cards-displayed'].value

const SurvivalCardsDeck = ({game, playerId, animation}) => {
  const {t} = useTranslation()
  const isDrawingSurvivalCard = animation && animation.move.type === DRAW_SURVIVAL_CARD
  const slice = game.survivalCardsDeck.slice(0, maxCardsDisplayed)
  return (
    <Tooltip title={t('Survival cards ({count} {count, plural, one {card} other {cards}} left)', {count: game.survivalCardsDeck.length})} enterTouchDelay={0}>
      <div className="survival-cards-deck">
        {slice.map((card, index) => {
          const classes = []
          if (index + 1 === slice.length && isDrawingSurvivalCard && !animation.moveApplied && playerId && playerId !== animation.move.huntedId) {
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
          return <SurvivalCard key={index} classes={classes}/>
        })}
      </div>
    </Tooltip>
  )
}

export default SurvivalCardsDeck