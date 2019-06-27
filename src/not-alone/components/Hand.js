import React from "react"
import {CREATURE, getHunted} from "../NotAlone"
import PlaceCard, {PLACE_CARD} from "./PlaceCard"
import HuntCard from "./HuntCard"
import "./hand.scss"
import {DRAW_HUNT_CARD} from "../moves/DrawHuntCard"
import SurvivalCard from "./SurvivalCard"
import {PLAY_PLACE_CARD} from "../moves/PlayPlaceCard"
import CardInHand from "../../util/CardInHand"

const Hand = ({game, playerId, animation, play}) => {
  const cards = []

  if (playerId === CREATURE) {
    const isDrawingHuntCard = animation && animation.move.type === DRAW_HUNT_CARD
    game.creature.hand.forEach((huntCard) => {
      const classes = []
      if (isDrawingHuntCard && animation.move.card === huntCard) {
        classes.push('drawing')
      }
      cards.push(<CardInHand key={huntCard} classes={classes}><HuntCard cardName={huntCard}/></CardInHand>)
    })
    if (isDrawingHuntCard && !animation.moveApplied) {
      cards.push(<CardInHand key={animation.move.card} classes={['will-draw']}><HuntCard cardName={animation.move.card}/></CardInHand>)
    }
  } else {
    const hunted = getHunted(game, playerId)
    hunted.handPlaceCards.forEach((place) => {
      cards.push((
        <CardInHand useDragItem={{type: PLACE_CARD, place}} key={place} onClick={() => play({type: PLAY_PLACE_CARD, place})}>
          <PlaceCard place={place} classes={['playable']}/>
        </CardInHand>
      ))
    })
    hunted.handSurvivalCards.forEach((survivalCard) => {
      cards.push((
        <CardInHand key={survivalCard}>
          <SurvivalCard cardName={survivalCard}/>
        </CardInHand>
      ))
    })
  }

  return (
    <div className="hand">
      {cards}
    </div>
  )
}

export default Hand