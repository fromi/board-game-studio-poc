import React from 'react'
import {CREATURE, getHunted} from '@bga/not-alone'
import './played-cards.scss'
import PlaceCardPlayed from './PlaceCardPlayed'

export default function PlayedCards(props) {
  const {game, playerId} = props
  if (playerId === CREATURE) {
    return null
  } else {
    const hunted = getHunted(game, playerId)
    return (
      <div className="played-cards">
        {hunted.playedPlaceCards.map(place => {
          return <PlaceCardPlayed place={place} {...props} key={place}/>
        })}
      </div>
    )
  }
}