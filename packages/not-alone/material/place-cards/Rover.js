import {getHunted, PLACE_CARD, PLACES} from '../../NotAlone'
import {THE_ROVER} from '../PlaceCards'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {takePlaceFromReserve} from '../../moves/TakePlaceFromReserve'

export const Rover = {
  canUsePower: (game, hunted) => PLACES.find(place => canTakePlaceFromReserve(game, hunted, place)),

  usePower: (game) => game.ongoingAction = {cardType: PLACE_CARD, card: THE_ROVER},

  getHuntedMoves: (game, huntedId) => {
    if (huntedId === getCurrentHuntedId(game)) {
      const hunted = getHunted(game, huntedId)
      return PLACES.filter(place => canTakePlaceFromReserve(game, hunted, place)).map(place => takePlaceFromReserve(huntedId, place))
    }
  }
}

function canTakePlaceFromReserve(game, hunted, place) {
  return game.reserve[place] > 0 && !huntedOwnPlace(hunted, place)
}

function huntedOwnPlace(hunted, place) {
  return hunted.handPlaceCards.includes(place) || hunted.discardedPlaceCards.includes(place) || hunted.playedPlaceCards.includes(place)
}