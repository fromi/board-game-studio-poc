import React from 'react'
import {CREATURE} from '@bga/not-alone'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import {REVEAL_PLACE_CARDS} from '@bga/not-alone/moves/RevealPlaceCard'
import {placeTexts} from './material/place-cards/PlaceCard'

export default {
  [DRAW_HUNT_CARD]: (t, move, {playerId, playersMap}) => playerId === CREATURE ?
    t('You draw {quantity, plural, one {one Hunt card} other {{quantity} Hunt cards}}', {quantity: move.quantity}) :
    t('{player} draws {quantity, plural, one {one Hunt card} other {{quantity} Hunt cards}}',
      {quantity: move.quantity, player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender}),
  [DRAW_SURVIVAL_CARD]: (t, move, {playerId, playersMap}) => playerId === move.huntedId ?
    t('You draw {quantity, plural, one {a Survival card} other {{quantity} Survival cards}}', {quantity: move.quantity}) :
    t('{player} draws {quantity, plural, one {a Survival card} other {{quantity} Survival cards}}',
      {quantity: move.quantity, player: playersMap[move.huntedId].name, gender: playersMap[move.huntedId].gender}),
  [REVEAL_PLACE_CARDS]: (t, move, {playerId, playersMap}) => {
    if (playerId === move.huntedId) {
      if (move.revealedPlaces.length === 1) {
        return t('You reveal {place}', {place: placeTexts[move.revealedPlaces[0]].name(t)})
      } else {
        return t('You reveal {place1} and {place2}', {
          place1: placeTexts[move.revealedPlaces[0]].name(t),
          place2: placeTexts[move.revealedPlaces[1]].name(t)
        })
      }
    } else {
      if (move.revealedPlaces.length === 1) {
        return t('{player} reveals {place}', {player: playersMap[move.huntedId].name, place: placeTexts[move.revealedPlaces[0]].name(t)})
      } else {
        return t('{player} reveals {place1} and {place2}', {
          player: playersMap[move.huntedId].name,
          place1: placeTexts[move.revealedPlaces[0]].name(t),
          place2: placeTexts[move.revealedPlaces[1]].name(t)
        })
      }
    }
  }
}