import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import PlaceCard from '../material/place-cards/PlaceCard'
import SurvivalCard from '../material/survival-cards/SurvivalCard'
import {useTranslation} from 'react-i18next'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import HandItem from '../../util/Hand'

export default function HuntedPlayedHand(props) {
  const {hunted, huntedId, animation} = props
  const {t} = useTranslation()
  const isDrawingSurvivalCard = animation && animation.move.type === DRAW_SURVIVAL_CARD && animation.move.huntedId === huntedId
  const classes = ['hand']
  if (isDrawingSurvivalCard) {
    classes.push('drawing-survival-card')
  }

  return (
    <Tooltip
      title={t('{placeCards, plural, one {One Place card} other {{placeCards} Place cards}} and {survivalCards, plural, one {one Survival card} other {{survivalCards} Survival cards}}',
        {placeCards: hunted.handPlaceCards.length, survivalCards: hunted.handSurvivalCards.length})} enterTouchDelay={0}>
      <div className={classes.join(' ')}>
        {hunted.handPlaceCards.map((card, index) => <HandItem key={'place-card-' + index}><PlaceCard/></HandItem>)}
        {hunted.handSurvivalCards.map((card, index) => {
          const isDrawing = isDrawingSurvivalCard && index >= hunted.handSurvivalCards.length - animation.move.quantity
          return <HandItem key={'survival-card-' + index} className={isDrawing ? 'drawing' : ''}><SurvivalCard/></HandItem>
        })}
      </div>
    </Tooltip>
  )
}