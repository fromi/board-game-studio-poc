import React from "react"
import {CREATURE, getHunted} from "../NotAlone"
import PlaceCard from "./PlaceCard"
import HuntCard from "./HuntCard"
import "./hand.css"

const Hand = ({game, playerId}) => {
  if (playerId === CREATURE) {
    return (
      <div className="hand">
        {game.creature.hand.map(huntCard => (
          <HuntCard cardName={huntCard} key={huntCard}/>
        ))}
      </div>
    )
  } else {
    const hunted = getHunted(game, playerId)
    return (
      <div className="hand">
        {hunted.handPlaceCards.map(place => (
          <PlaceCard place={place} key={place}/>
        ))}
      </div>
    )
  }
}

export default Hand