import React from 'react'
import {getHunted} from '@bga/not-alone'
import PlaceCardDiscarded from './PlaceCardDiscarded'
import './discarded-places.scss'

const DiscardedPlaces = (props) => {
  const {game, playerId} = props
  const hunted = getHunted(game, playerId)

  return (
    <div className="discarded-places">
      {hunted.discardedPlaceCards.map(place => {
        return <PlaceCardDiscarded place={place} {...props} key={place}/>
      })}
    </div>
  )
}

export default DiscardedPlaces
