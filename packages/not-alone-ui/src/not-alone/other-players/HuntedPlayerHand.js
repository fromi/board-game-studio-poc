import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import PlaceCard from '../material/place-cards/PlaceCard'
import SurvivalCard from '../material/survival-cards/SurvivalCard'
import {useTranslation} from 'react-i18next'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'

const HuntedPlayedHand = (props) => {
  const {hunted, huntedId, animation} = props
  const {t} = useTranslation()
  const isDrawingSurvivalCard = animation && animation.move.type === DRAW_SURVIVAL_CARD && animation.move.huntedId === huntedId

  return (
    <Tooltip
      title={t('{placeCards, plural, one {One Place card} other {{placeCards} Place cards}} and {survivalCards, plural, one {one Survival card} other {{survivalCards} Survival cards}}',
        {placeCards: hunted.handPlaceCards.length, survivalCards: hunted.handSurvivalCards.length})} enterTouchDelay={0}>
      <div className="player-hand">
        {hunted.handPlaceCards.map((card, index) => <PlaceCard key={index}/>)}
        {hunted.handSurvivalCards.map((card, index) => {
          const classes = []
          if (isDrawingSurvivalCard && index === hunted.handSurvivalCards.length - 1) {
            classes.push('drawing')
          }
          return <SurvivalCard key={index} classes={classes}/>
        })}
      </div>
    </Tooltip>
  )
}
export default HuntedPlayedHand