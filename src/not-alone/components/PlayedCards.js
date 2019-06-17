import React from "react"
import {CREATURE, getHunted} from "../NotAlone"
import PlaceCard from "./PlaceCard"
import {PLAY_PLACE_CARD} from "../moves/PlayPlaceCard"
import "./played-cards.css"

const PlayedCards = ({game, playerId, undo}) => {
  if (playerId === CREATURE) {
    return null
  } else {
    const hunted = getHunted(game, playerId)
    return (
      <div className="played-cards">
        {hunted.playedPlaceCards.map(place => (
          <PlaceCard place={place} key={place} onClick={() => undo({type: PLAY_PLACE_CARD, place})}/>
        ))}
      </div>
    )
  }
}

export default PlayedCards