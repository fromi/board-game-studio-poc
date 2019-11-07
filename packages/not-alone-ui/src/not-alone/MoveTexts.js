import {CREATURE} from '@bga/not-alone'
import {DRAW_HUNT_CARD} from '@bga/not-alone/moves/DrawHuntCard'
import {DRAW_SURVIVAL_CARD} from '@bga/not-alone/moves/DrawSurvivalCard'
import {REVEAL_PLACE_CARDS} from '@bga/not-alone/moves/RevealPlaceCard'
import {placeTexts} from './material/place-cards/PlaceCard'
import {PLACE_HUNT_TOKEN} from '@bga/not-alone/moves/PlaceHuntToken'
import {huntTokens} from './material/hunt-tokens/HuntToken'
import {USE_PLACE_POWER} from '@bga/not-alone/moves/UsePlacePower'
import {TAKE_BACK_PLAYED_PLACE} from '@bga/not-alone/moves/TakeBackPlayedPlace'
import {PUT_MARKER_ON_BEACH} from '@bga/not-alone/moves/PutMarkerOnBeach'
import {MOVE_RESCUE_COUNTER} from '@bga/not-alone/moves/MoveRescueCounter'
import {AT_LEAST_ONE_HUNTED_LOST_ALL_WILL, MOVE_ASSIMILATION_COUNTER} from '@bga/not-alone/moves/MoveAssimilationCounter'
import {TAKE_BACK_DISCARDED_PLACE} from '@bga/not-alone/moves/TakeBackDiscardedPlace'
import {LOSE_WILL_COUNTER} from '@bga/not-alone/moves/LoseWillCounter'
import {CREATURE_TOKEN} from '@bga/not-alone/material/HuntTokens'
import {huntCardTexts} from './material/hunt-cards/HuntCard'
import HuntCards, {ANTICIPATION} from '@bga/not-alone/material/HuntCards'
import {COPY_PLACE_POWER} from '@bga/not-alone/moves/CopyPlacePower'
import {TAKE_PLACE_FROM_RESERVE} from '@bga/not-alone/moves/TakePlaceFromReserve'
import {GIVE_UP} from '@bga/not-alone/moves/GiveUp'
import {REGAIN_WILL_COUNTER} from '@bga/not-alone/moves/RegainWillCounter'
import {DISCARD_SURVIVAL_CARD} from '@bga/not-alone/moves/DiscardSurvivalCard'
import {survivalCardTexts} from './material/survival-cards/SurvivalCard'
import {RESIST} from '@bga/not-alone/moves/Resist'


const takeBackPlaceText = (t, move, {playerId, playersMap}) => {
  const place = placeTexts[move.place].name(t)
  if (playerId === move.huntedId) {
    return t('You take back {place} to your hand', {place})
  } else {
    return t('{player} takes back {place} to {gender, select, ♀ {her} ♂ {his} other {their}}',
      {player: playersMap[move.huntedId].name, gender: playersMap[move.huntedId].gender, place})
  }
}

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
    if (playerId === move.huntedId) {
      return t('You use the power {ofPlace}', {ofPlace: placeTexts[move.place].article(t)})
    } else {
      return t('{player} uses the power {ofPlace}', {player: playersMap[move.huntedId].name, ofPlace: placeTexts[move.place].article(t)})
    }
  },
  [COPY_PLACE_POWER]: (t, move, {playerId, playersMap}) => {
    if (playerId === move.huntedId) {
      return t('You copy the power {ofPlace}', {ofPlace: placeTexts[move.place].article(t)})
    } else {
      return t('{player} copies the power {ofPlace}', {player: playersMap[move.huntedId].name, ofPlace: placeTexts[move.place].article(t)})
    }
  },
  [TAKE_BACK_PLAYED_PLACE]: takeBackPlaceText,
  [TAKE_BACK_DISCARDED_PLACE]: takeBackPlaceText,
  [PUT_MARKER_ON_BEACH]: (t) => t('The Marker counter is placed on the Beach'),
  [TAKE_PLACE_FROM_RESERVE]: (t, move, {playerId, playersMap}) => {
    if (playerId === move.huntedId) {
      return t('You take a copy {ofPlace} from the reserve', {ofPlace: placeTexts[move.place].article(t)})
    } else {
      return t('{player} takes a copy {ofPlace} from the reserve', {player: playersMap[move.huntedId].name, ofPlace: placeTexts[move.place].article(t)})
    }
  },
  [DISCARD_SURVIVAL_CARD]: (t, move, {playerId, playersMap}) => {
    if (playerId === move.huntedId) {
      return t('You discard {card}', {card: survivalCardTexts[move.card].name(t)})
    } else {
      return t('{player} discards {card}', {player: playersMap[move.huntedId].name, card: survivalCardTexts[move.card].name(t)})
    }
  },
  [LOSE_WILL_COUNTER]: (t, move, {playerId, playersMap}) => {
    if (playerId === move.huntedId) {
      if (move.reason === CREATURE_TOKEN) {
        if (move.quantity === 1) {
          return t('You are caught by the Creature! You lose a Will counter')
        } else {
          return t('You are caught by the Creature on the Lair! You lose 2 Will counters')
        }
      } else if (HuntCards.includes(move.reason)) {
        return t('You lose a Will counter because of {cardName} card', {cardName: huntCardTexts[move.reason].name(t)})
      } else {
        return t('You lose a Will counter')
      }
    } else {
      const player = playersMap[move.huntedId].name
      if (move.reason === CREATURE_TOKEN) {
        if (move.quantity === 1) {
          return t('{player} is caught by the Creature and loses a Will counter', {player})
        } else {
          return t('{player} is caught by the Creature on the Lair and loses 2 Will counters', {player})
        }
      } else if (HuntCards.includes(move.reason)) {
        return t('{player} loses a Will counter because of {cardName} card', {player, cardName: huntCardTexts[move.reason].name(t)})
      } else {
        return t('{player} loses a Will counter', {player})
      }
    }
  },
  [MOVE_RESCUE_COUNTER]: (t) => t('The Rescue counter moves forward 1 space'),
  [MOVE_ASSIMILATION_COUNTER]: (t, move) => {
    if (move.reason === CREATURE_TOKEN) {
      return t('The Creature caught a Hunted! The Assimilation counter moves forward 1 space')
    } else if (move.reason === AT_LEAST_ONE_HUNTED_LOST_ALL_WILL) {
      return t('At least on Hunted lost his third Will counter! The Assimilation counter moves forward 1 space')
    } else if (move.reason === ANTICIPATION) {
      return t('The Assimilation counter moves forward 1 extra space because of Anticipation card!')
    } else {
      return t('The Assimilation counter moves forward 1 space')
    }
  },
  [RESIST]: (t, move, {playerId, playersMap}) => {
    if (playerId === move.huntedId) {
      return t('You resist')
    } else {
      return t('{player} resists', {player: playersMap[move.huntedId].name})
    }
  },
  [GIVE_UP]: (t, move, {playerId, playersMap}) => {
    if (playerId === move.huntedId) {
      return t('You give up')
    } else {
      return t('{player} gives up', {player: playersMap[move.huntedId].name})
    }
  },
  [REGAIN_WILL_COUNTER]: (t, move, {playerId, playersMap}) => {
    if (playerId === move.huntedId) {
      return t('You regain {count, plural, one{1 Will counter} other{{count} Will counters}}', {count: move.quantity})
    } else {
      return t('{player} regains {count, plural, one{1 Will counter} other{{count} Will counters}}', {player: playersMap[move.huntedId].name, count: move.quantity})
    }
  }
}