import React from 'react'
import {Tooltip} from '@material-ui/core'
import PlaceCard, {placeTexts} from '../material/place-cards/PlaceCard'
import {useTranslation} from 'react-i18next'
import './place-card-discarded.scss'
import DragWrapper from '../../util/DragWrapper'
import {getLegalMoves, PLACE_CARD} from '@bga/not-alone'
import {TAKE_BACK_DISCARDED_PLACE} from '@bga/not-alone/moves/TakeBackDiscardedPlace'

export default function PlaceCardDiscarded(props) {
  const {place, game, playerId} = props
  const {t} = useTranslation()
  const canTakeBack = getLegalMoves(game, playerId).some((move) => move.type === TAKE_BACK_DISCARDED_PLACE && move.huntedId === playerId && move.place === place)

  return (
    <Tooltip title={t('{place} is in your discard', {place: placeTexts[place].name(t)})} enterTouchDelay={0}>
      <DragWrapper className="place-card-discarded" draggable={canTakeBack} item={{type: PLACE_CARD, place}}>
        <PlaceCard place={place}/>
      </DragWrapper>
    </Tooltip>
  )
}