import React from "react"
import {CREATURE, getHunted} from "../NotAlone"
import PlaceCard, {PLACE_CARD} from "./PlaceCard"
import HuntCard from "./HuntCard"
import "./hand.scss"
import {DRAW_HUNT_CARD} from "../moves/DrawHuntCard"
import SurvivalCard from "./SurvivalCard"
import {PLAY_PLACE_CARD} from "../moves/PlayPlaceCard"
import CardInHand from "../../util/CardInHand"
import {DRAW_SURVIVAL_CARD} from "../moves/DrawSurvivalCard"
import {MOVE_PLAYED} from "../../studio/reducers/ServerReducer"

const Hand = ({game, playerId, animation, play}) => {
  const cards = []
  const hunted = playerId && playerId !== CREATURE ? getHunted(game, playerId) : undefined

  if (hunted) {
    hunted.handPlaceCards.forEach((place) => {
      cards.push((
        <CardInHand useDragItem={{type: PLACE_CARD, place}} key={place} onClick={() => play({type: PLAY_PLACE_CARD, place})}>
          <PlaceCard place={place} classes={['playable']}/>
        </CardInHand>
      ))
    })
  }

  const specialCardDrawType = hunted ? DRAW_SURVIVAL_CARD : DRAW_HUNT_CARD
  const isDrawingSpecialCard = animation && animation.type === MOVE_PLAYED && animation.move.type === specialCardDrawType && (!hunted || animation.move.playerId === playerId)
  const SpecialCardComponent = hunted ? SurvivalCard : HuntCard
  const specialCards = hunted ? hunted.handSurvivalCards : game.creature.hand

  specialCards.forEach((card) => {
    const classes = []
    if (isDrawingSpecialCard && animation.move.card === card) {
      classes.push('drawing')
    }
    cards.push(
      <CardInHand key={card} classes={classes}>
        <SpecialCardComponent cardName={card}/>
      </CardInHand>
    )
  })
  if (isDrawingSpecialCard && !animation.moveApplied) {
    cards.push(<CardInHand key={animation.move.card} classes={['will-draw']}><SpecialCardComponent cardName={animation.move.card}/></CardInHand>)
  }

  return <div className="hand">{cards}</div>
}

export default Hand