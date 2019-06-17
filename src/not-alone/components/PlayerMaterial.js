import React from 'react'
import Hand from "./Hand"
import {CREATURE} from "../NotAlone"
import PlayedCards from "./PlayedCards"

const PlayerMaterial = (props) => {
  const {playerId} = props
  if (playerId === CREATURE) {
    return (
      <React.Fragment>
        <Hand {...props}/>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Hand {...props}/>
        <PlayedCards {...props}/>
      </React.Fragment>
    )
  }
}

export default PlayerMaterial