import React from 'react'
import {CREATURE, getHunted, getLegalMoves} from '@bga/not-alone'
import PlaceCard, {PLACE_CARD} from '../material/place-cards/PlaceCard'
import HuntCard from '../material/hunt-cards/HuntCard'
import './hand.scss'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import SurvivalCard from '../material/survival-cards/SurvivalCard'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'
import CardInHand from '../../util/CardInHand'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import {MOVE_PLAYED} from '../../studio/reducers/ServerReducer'

const Hand = ({game, playerId, animation, play, undo}) => {
  const cards = []
  const hunted = playerId && playerId !== CREATURE ? getHunted(game, playerId) : undefined

  if (hunted) {
    const isPlayingPlaceCard = animation && animation.type === MOVE_PLAYED && animation.move.type === PLAY_PLACE_CARD && animation.move.huntedId === playerId
    hunted.handPlaceCards.forEach((place) => {
      const placeCardClasses = []
      const dragItem = game.phase === 1 ? {type: PLACE_CARD, place} : undefined
      if (dragItem) {
        placeCardClasses.push('playable')
      }
      const onSelect = () => {
        const move = getLegalMoves(game, playerId).find((move) => move.place === place && move.type === PLAY_PLACE_CARD)
        if (move) {
          play(move)
        } else if (game.phase === 1 && hunted.playedPlaceCards.length) {
          undo({type: PLAY_PLACE_CARD, place: hunted.playedPlaceCards[0], huntedId: playerId})
          play({type: PLAY_PLACE_CARD, place, huntedId: playerId})
        }
      }
      cards.push((
        <CardInHand useDragItem={dragItem} key={place} onSelect={onSelect}>
          <PlaceCard place={place} classes={placeCardClasses}/>
        </CardInHand>
      ))
    })
    if (isPlayingPlaceCard) {
      const position = hunted.handPlaceCards.filter(place => place < animation.move.place).length
      cards.splice(position, 0, (
        <CardInHand key={animation.move.place} classes={['playing-place-card']}>
          <PlaceCard place={animation.move.place}/>
        </CardInHand>
      ))
    }
  }

  const specialCardDrawType = hunted ? DRAW_SURVIVAL_CARD : DRAW_HUNT_CARD
  const isDrawingSpecialCard = animation && animation.type === MOVE_PLAYED && animation.move.type === specialCardDrawType && (!hunted || animation.move.huntedId === playerId)
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

  return <div className="hand">{cards}</div>
}

export default Hand