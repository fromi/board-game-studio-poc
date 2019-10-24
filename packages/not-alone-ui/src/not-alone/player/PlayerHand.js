import React from 'react'
import {CREATURE, getHunted, getLegalMoves} from '@bga/not-alone'
import PlaceCard, {PLACE_CARD} from '../material/place-cards/PlaceCard'
import HuntCard from '../material/hunt-cards/HuntCard'
import './player-hand.scss'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import SurvivalCard from '../material/survival-cards/SurvivalCard'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import {MOVE_PLAYED} from '../../studio/reducers/ServerReducer'
import HandItem from '../../util/Hand'
import {drawNextCardDelay} from '../NotAloneUI'

export default function PlayerHand({game, playerId, animation}) {
  const cards = []
  const hunted = playerId && playerId !== CREATURE ? getHunted(game, playerId) : undefined

  const classes = ['player-hand']

  if (hunted) {
    hunted.handPlaceCards.forEach((place) => {
      const canBePlayed = getLegalMoves(game, playerId).some(move => move.type === PLAY_PLACE_CARD && move.place === place)
      cards.push(
        <HandItem key={place} drag={{enable: canBePlayed, item: {type: PLACE_CARD, place}}} hovering>
          <PlaceCard place={place}/>
        </HandItem>
      )
    })
    if (animation && animation.type === MOVE_PLAYED && animation.move.type === PLAY_PLACE_CARD && animation.move.huntedId === playerId) {
      classes.push('playing-place-card')
      const index = hunted.handPlaceCards.filter(place => place < animation.move.place).length
      cards.splice(index, 0, (
        <HandItem key={animation.move.place} className="being-played" drag={{item: {type: PLACE_CARD, place: animation.move.place}}}>
          <PlaceCard place={animation.move.place}/>
        </HandItem>
      ))
    }
  }

  const specialCardDrawType = hunted ? DRAW_SURVIVAL_CARD : DRAW_HUNT_CARD
  const isDrawingSpecialCard = animation && animation.type === MOVE_PLAYED && animation.move.type === specialCardDrawType && (!hunted || animation.move.huntedId === playerId)
  const SpecialCardComponent = hunted ? SurvivalCard : HuntCard
  const specialCards = hunted ? hunted.handSurvivalCards : game.creature.hand

  specialCards.forEach((card, index) => {
    const drawing = isDrawingSpecialCard && animation.move.cards.includes(card)
    const classes = drawing ? ['drawing'] : []
    const cardsDrawnBefore = drawing ? index - specialCards.length + animation.move.quantity : 0
    cards.push(
      <HandItem key={card} className={drawing ? 'drawing' : ''} hovering style={{animationDelay: drawNextCardDelay * cardsDrawnBefore + 's'}}>
        <SpecialCardComponent card={card} classes={classes}/>
      </HandItem>
    )
  })

  return <div className={classes.join(' ')}>{cards}</div>
}