import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import PlaceCard from '../material/place-cards/PlaceCard'
import SurvivalCard from '../material/survival-cards/SurvivalCard'
import {useTranslation} from 'react-i18next'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import HandItem from '../../util/Hand'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'
import './hunted-player-hand.scss'
import {TAKE_BACK_PLAYED_PLACE} from '@bga/not-alone/moves/TakeBackPlayedPlace'
import {MOVE_PLAYED} from '../../studio/reducers/ServerReducer'
import {DISCARD_SURVIVAL_CARD} from '@bga/not-alone/moves/DiscardSurvivalCard'

export default function HuntedPlayedHand(props) {
  const {hunted, huntedId, animation} = props
  const {t} = useTranslation()
  const isDrawingSurvivalCard = animation && animation.move.type === DRAW_SURVIVAL_CARD && animation.move.huntedId === huntedId
  const isPlayingPlaceCard = animation && animation.move.type === PLAY_PLACE_CARD && animation.move.huntedId === huntedId
  const isTakingBackPlayedPlace = animation && animation.move.type === TAKE_BACK_PLAYED_PLACE && animation.move.huntedId === huntedId
  const isDiscardingSurvivalCard = animation && animation.type === MOVE_PLAYED && animation.move.type === DISCARD_SURVIVAL_CARD && animation.move.huntedId === huntedId

  const classes = ['hand']
  if (isDrawingSurvivalCard) {
    classes.push('drawing-survival-card')
  }

  return (
    <Tooltip
      title={t('{placeCards, plural, one {One Place card} other {{placeCards} Place cards}} and {survivalCards, plural, one {one Survival card} other {{survivalCards} Survival cards}}',
        {placeCards: hunted.handPlaceCards.length, survivalCards: hunted.handSurvivalCards.length})} enterTouchDelay={0}>
      <div className={classes.join(' ')}>
        {hunted.handPlaceCards.map((card, index) => {
          const isTakingBack = isTakingBackPlayedPlace && index === hunted.handPlaceCards.length - 1
          return <HandItem key={'place-card-' + index} className={isTakingBack ? 'taking-back-played-place' : ''}><PlaceCard place={isTakingBack ? animation.move.place : undefined}/></HandItem>
        })}
        {isPlayingPlaceCard && <HandItem key={'place-card-' + hunted.handPlaceCards.length} className="playing"><PlaceCard/></HandItem>}
        {hunted.handSurvivalCards.map((card, index) => {
          const isDrawing = isDrawingSurvivalCard && index >= hunted.handSurvivalCards.length - animation.move.quantity
          return <HandItem key={'survival-card-' + index} className={isDrawing ? 'drawing' : ''}><SurvivalCard/></HandItem>
        })}
        {isDiscardingSurvivalCard && <HandItem key={'survival-card-' + hunted.handSurvivalCards.length} className="discarding"><SurvivalCard card={animation.move.card}/></HandItem>}
      </div>
    </Tooltip>
  )
}