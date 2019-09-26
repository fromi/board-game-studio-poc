import React from 'react'
import {THE_BEACH, THE_ROVER} from '@bga/not-alone/material/PlaceCards'
import MarkerCounter from '../material/counters/MarkerCounter'
import {Tooltip} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import ArtemiaPlaceCard from './ArtemiaPlaceCard'
import './artemia-place.scss'

const ArtemiaPlace = (props) => {
  const {place, game} = props
  const {t} = useTranslation()
  const classes = ['artemia-place', 'place-' + place]

  return (
    <div className={classes.join(' ')}>
      <ArtemiaPlaceCard {...props} place={place}/>
      {place === THE_BEACH && <MarkerCounter {...props}/>}
      {place > THE_ROVER && (
        <Tooltip title={t('{count, plural, one {One copy} other {{count} copies}} left in the reserve', {count: game.reserve[place]})}
                 enterTouchDelay={0}>
          <div className="reserve">{game.reserve[place]}</div>
        </Tooltip>
      )}
    </div>
  )
}

export default ArtemiaPlace