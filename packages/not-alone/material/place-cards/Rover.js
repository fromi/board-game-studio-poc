import {getHunted, PLACES} from '../../NotAlone'
import {THE_JUNGLE} from '../PlaceCards'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {takePlaceFromReserve} from '../../moves/TakePlaceFromReserve'

export const Rover = {
  canUsePower: (game, hunted) => PLACES.find(place => canTakePlaceFromReserve(hunted, place)),

  usePower: (game) => game.pendingEffect = {cardType: 'PLACE_CARD', card: THE_JUNGLE},

  getPlayerMoves: (game, playerId) => {
    if (playerId === getCurrentHuntedId(game)) {
      const hunted = getHunted(game, playerId)
      return PLACES.filter(place => canTakePlaceFromReserve(hunted, place)).map(place => takePlaceFromReserve(playerId, place))
    }
  }
}

function canTakePlaceFromReserve(hunted, place) {
  return game.reserve[place] > 0 && !huntedOwnPlace(hunted, place)
}

function huntedOwnPlace(hunted, place) {
  return hunted.handPlaceCards.includes(place) || hunted.discardedPlaceCards.includes(place) || hunted.playedPlaceCards.includes(place)
}