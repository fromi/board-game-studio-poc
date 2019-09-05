import React from "react"
import HuntCard from "./HuntCard"
import Tooltip from '@material-ui/core/Tooltip';
import {useTranslation} from 'react-i18next';
import {DRAW_HUNT_CARD} from "@bga/not-alone/moves/DrawHuntCard"
import {CREATURE, getHuntedNumber} from "@bga/not-alone"
import {numberOfHuntedAndHuntedPositionToTableSeats} from "./OtherPlayers"

// eslint-disable-next-line import/no-webpack-loader-syntax
const style = require('sass-extract-loader!../variables.scss');
const maxCardsDisplayed = style.global['$decks-max-cards-displayed'].value

const HuntCardsDeck = ({game, animation, playerId}) => {
  const {t} = useTranslation()
  const isDrawingHuntCard = animation && animation.move.type === DRAW_HUNT_CARD
  const slice = game.huntCardsDeck.slice(-maxCardsDisplayed)
  return (
    <Tooltip title={t('Hunt cards ({count, plural, one {one card} other {{count} cards}} left)', {count: game.huntCardsDeck.length})} enterTouchDelay={0}>
      <div className="hunt-cards-deck">
        {slice.map((card, index) => {
          const classes = []
          const cardNumber = game.huntCardsDeck.length - slice.length + index + 1
          if (cardNumber === game.huntCardsDeck.length && isDrawingHuntCard && playerId && playerId !== CREATURE) {
            const huntedNumber = getHuntedNumber(playerId)
            const tableSeats = numberOfHuntedAndHuntedPositionToTableSeats[game.hunted.length][huntedNumber]
            classes.push('drawing', ...tableSeats[0])
          }
          return <HuntCard key={cardNumber} classes={classes}/>
        })}
      </div>
    </Tooltip>
  )
}

export default HuntCardsDeck