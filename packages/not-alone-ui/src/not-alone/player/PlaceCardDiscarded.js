import React from 'react'
import {Tooltip} from '@material-ui/core'
import PlaceCard, {placeTexts} from '../material/place-cards/PlaceCard'
import {useTranslation} from 'react-i18next'
import './place-card-discarded.scss'

export default function PlaceCardDiscarded(props) {
  const {place} = props
  const {t} = useTranslation()
  const classes = ['place-card-discarded']

  return (
    <Tooltip title={t('{place} is in your discard', {place: placeTexts[place].name(t)})} enterTouchDelay={0}>
      <div className={classes.join(' ')}>
        <PlaceCard place={place}/>
      </div>
    </Tooltip>
  )
}