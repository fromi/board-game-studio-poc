import React from 'react'
import {CREATURE, getHunted, getLegalMoves, HUNT_CARD, PLACE_CARD, SURVIVAL_CARD} from '@bga/not-alone'
import PlaceCard from '../material/place-cards/PlaceCard'
import HuntCard from '../material/hunt-cards/HuntCard'
import './player-hand.scss'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import SurvivalCard from '../material/survival-cards/SurvivalCard'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import {MOVE_PLAYED} from '../../studio/reducers/ServerReducer'
import HandItem from '../../util/Hand'
import {drawNextCardDelay} from '../NotAloneUI'
import {TAKE_BACK_PLAYED_PLACE} from '@bga/not-alone/moves/TakeBackPlayedPlace'
import {TAKE_BACK_DISCARDED_PLACE} from '@bga/not-alone/moves/TakeBackDiscardedPlace'
import {TAKE_PLACE_FROM_RESERVE} from '@bga/not-alone/moves/TakePlaceFromReserve'
import {PLAY_HUNT_CARD} from '@bga/not-alone/moves/PlayHuntCard'
import {PLAY_SURVIVAL_CARD} from '@bga/not-alone/moves/PlaySurvivalCard'
import {DISCARD_SURVIVAL_CARD} from '@bga/not-alone/moves/DiscardSurvivalCard'

export default function PlayerHand({game, playerId, animation}) {
  const cards = []
  const hunted = playerId !== CREATURE ? getHunted(game, playerId) : undefined
  const moves = getLegalMoves(game, playerId)

  const classes = ['player-hand']

  if (hunted) {
    hunted.handPlaceCards.forEach((place) => {
      const canBePlayed = moves.some(move => move.type === PLAY_PLACE_CARD && move.place === place)
      const isAnimatingPlace = animation && animation.type === MOVE_PLAYED && animation.move.huntedId === playerId && animation.move.place === place
      const isTakingBackPlayedPlace = isAnimatingPlace && animation.move.type === TAKE_BACK_PLAYED_PLACE
      const isTakingBackDiscardedPlace = isAnimatingPlace && animation.move.type === TAKE_BACK_DISCARDED_PLACE
      const isTakingPlaceFromReserve = isAnimatingPlace && animation.move.type === TAKE_PLACE_FROM_RESERVE
      let itemClassName = isAnimatingPlace ? moveToClassName[animation.move.type] || '' : ''
      if (isTakingBackPlayedPlace || isTakingBackDiscardedPlace || isTakingPlaceFromReserve) {
        classes.push('taking-place-card')
      }
      if (isTakingPlaceFromReserve) {
        itemClassName += ' reserve-' + (game.reserve[place] + 1)
      }
      cards.push(
        <HandItem key={place} drag={{enable: canBePlayed, item: {type: PLACE_CARD, place}}} hovering className={itemClassName}>
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
  const specialCardPlayType = hunted ? PLAY_SURVIVAL_CARD : PLAY_HUNT_CARD
  const specialCardDiscardType = hunted ? DISCARD_SURVIVAL_CARD : undefined
  const isDrawingSpecialCard = animation && animation.type === MOVE_PLAYED && animation.move.type === specialCardDrawType && (!hunted || animation.move.huntedId === playerId)
  const SpecialCardComponent = hunted ? SurvivalCard : HuntCard
  const specialCards = hunted ? hunted.handSurvivalCards : game.creature.hand

  specialCards.forEach((card, index) => {
    const canBePlayed = moves.some(move => move.type === specialCardPlayType && move.card === card)
    const canBeDiscarded = moves.some(move => move.type === specialCardDiscardType && move.card === card)
    const drawing = isDrawingSpecialCard && animation.move.cards.includes(card)
    const classes = drawing ? ['drawing'] : []
    const cardsDrawnBefore = drawing ? index - specialCards.length + animation.move.quantity : 0
    cards.push(
      <HandItem key={card} className={drawing ? 'drawing' : ''} hovering style={{animationDelay: drawNextCardDelay * cardsDrawnBefore + 's'}}
                drag={{enable: canBePlayed || canBeDiscarded, item: {type: hunted ? SURVIVAL_CARD : HUNT_CARD, card}}}>
        <SpecialCardComponent card={card} classes={classes}/>
      </HandItem>
    )
  })

  return <div className={classes.join(' ')}>{cards}</div>
}

const moveToClassName = {
  [TAKE_BACK_PLAYED_PLACE]: 'taking-back-played-place',
  [TAKE_BACK_DISCARDED_PLACE]: 'taking-back-discarded-place',
  [TAKE_PLACE_FROM_RESERVE]: 'taking-place-from-reserve'
}