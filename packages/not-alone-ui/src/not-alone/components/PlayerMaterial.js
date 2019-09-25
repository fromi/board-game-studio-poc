import React from 'react'
import Hand from './Hand'
import {CREATURE} from '@bga/not-alone'
import PlayedCards from './PlayedCards'
import DiscardedPlaces from './DiscardedPlaces'

const PlayerMaterial = (props) => {
  const {playerId} = props
  return (
    <React.Fragment>
      <Hand {...props}/>
      {playerId !== CREATURE && <PlayedCards {...props}/>}
      {playerId !== CREATURE && <DiscardedPlaces {...props}/>}
    </React.Fragment>
  )
}

export default PlayerMaterial