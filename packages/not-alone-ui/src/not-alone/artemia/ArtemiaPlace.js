import React from 'react'
import {THE_BEACH, THE_ROVER} from '@bga/not-alone/material/PlaceCards'
import MarkerCounter from '../material/counters/MarkerCounter'
import {Tooltip} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import ArtemiaPlaceCard from './ArtemiaPlaceCard'
import './artemia-place.scss'
import PlaceCard from '../material/place-cards/PlaceCard'

const ArtemiaPlace = (props) => {
  const {place, game} = props
  const {t} = useTranslation()
  const classes = ['artemia-place', 'place-' + place]

  return (
    <div className={classes.join(' ')}>
      <ArtemiaPlaceCard {...props} place={place}/>
      {place === THE_BEACH && <MarkerCounter {...props}/>}
      {place > THE_ROVER && (
        <Tooltip title={t('Reserve: there is {count, plural, one {one copy} other {{count} copies}} left to take using The Rover', {count: game.reserve[place]})}
                 enterTouchDelay={0}>
          <div className="reserve">{[...Array(game.reserve[place])].map((_, key) => <PlaceCard place={place} key={key}/>)}</div>
        </Tooltip>
      )}
    </div>
  )
}

export default ArtemiaPlace