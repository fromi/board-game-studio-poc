import {CREATURE} from '@bga/not-alone'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import {REVEAL_PLACE_CARDS} from '@bga/not-alone/moves/RevealPlaceCard'
import {placeTexts} from './material/place-cards/PlaceCard'
import {PLACE_HUNT_TOKEN} from '@bga/not-alone/moves/PlaceHuntToken'
import {huntTokens} from './material/hunt-tokens/HuntToken'
import {USE_PLACE_POWER} from '@bga/not-alone/moves/UsePlacePower'
import {TAKE_BACK_PLAYED_PLACE} from '@bga/not-alone/moves/TakeBackPlayedPlace'

export default {
  [DRAW_HUNT_CARD]: (t, move, {playerId, playersMap}) => playerId === CREATURE ?
    t('You draw {quantity, plural, one {one Hunt card} other {{quantity} Hunt cards}}', {quantity: move.quantity}) :
    t('{player} draws {quantity, plural, one {one Hunt card} other {{quantity} Hunt cards}}',
      {quantity: move.quantity, player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender}),
  [DRAW_SURVIVAL_CARD]: (t, move, {playerId, playersMap}) => playerId === move.huntedId ?
    t('You draw {quantity, plural, one {a Survival card} other {{quantity} Survival cards}}', {quantity: move.quantity}) :
    t('{player} draws {quantity, plural, one {a Survival card} other {{quantity} Survival cards}}',
      {quantity: move.quantity, player: playersMap[move.huntedId].name, gender: playersMap[move.huntedId].gender}),
  [PLACE_HUNT_TOKEN]: (t, move, {playerId, playersMap}) => {
    const huntToken = huntTokens[move.token].description(t)
    if (playerId === CREATURE) {
      if (move.locations.length === 1) {
        return t('You place the {huntToken} on {place}', {huntToken, place: placeTexts[move.locations[0]].name(t)})
      } else {
        return t('You place the {huntToken} on {place1} and {place2}',
          {huntToken, place1: placeTexts[move.locations[0]].name(t), place2: placeTexts[move.locations[1]].name(t)})
      }
    } else {
      if (move.locations.length === 1) {
        return t('{player} places the {huntToken} on {place}', {player: playersMap[CREATURE].name, huntToken, place: placeTexts[move.locations[0]].name(t)})
      } else {
        return t('{player} places the {huntToken} on {place1} and {place2}',
          {player: playersMap[CREATURE].name, huntToken, place1: placeTexts[move.locations[0]].name(t), place2: placeTexts[move.locations[1]].name(t)})
      }
    }
  },
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
  },
  [USE_PLACE_POWER]: (t, move, {playerId, playersMap}) => {
    const place = placeTexts[move.place].name(t)
    if (playerId === move.huntedId) {
      return t('You use the power of {place}', {place})
    } else {
      return t('{player} uses the power of {place}', {player: playersMap[move.huntedId].name, place})
    }
  },
  [TAKE_BACK_PLAYED_PLACE]: (t, move, {playerId, playersMap}) => {
    const place = placeTexts[move.place].name(t)
    if (playerId === move.huntedId) {
      return t('You take back {place} to your hand', {place})
    } else {
      return t('{player} takes back {place} to {gender, select, ♀ {her} ♂ {his} other {their}}',
        {player: playersMap[move.huntedId].name, gender: playersMap[move.huntedId].gender, place})
    }
  }
}