import React from "react"
import {CREATURE, getHunted} from "../NotAlone"
import PlaceCard from "./PlaceCard"
import HuntCard from "./HuntCard"
import "./hand.css"
import {DRAW_HUNT_CARD} from "../moves/DrawHuntCard"

const Hand = ({game, playerId, animation}) => {
  if (playerId === CREATURE) {
    const isDrawingHuntCard = animation && animation.move.type === DRAW_HUNT_CARD
    const hand = isDrawingHuntCard && !animation.moveApplied ? [...game.creature.hand, animation.move.card] : game.creature.hand
    return (
      <div className="hand">
        {hand.map(huntCard => {
          let state = 'hand'
          if (isDrawingHuntCard && animation.move.card === huntCard) {
            state = animation.moveApplied ? 'drawing' : 'will-draw'
          }
          return <HuntCard cardName={huntCard} key={huntCard} state={state}/>
        })}
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