import React from 'react'
import Hand from "./Hand"
import {CREATURE} from "@bga/not-alone"
import PlayedCards from "./PlayedCards"

const PlayerMaterial = (props) => {
  const {playerId} = props
  return (
    <React.Fragment>
      <Hand {...props}/>
      {playerId !== CREATURE && <PlayedCards {...props}/>}
    </React.Fragment>
  )
}

export default PlayerMaterial