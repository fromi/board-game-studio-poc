import {getHunted, getLegalMoves} from "@bga/not-alone";
import {places} from "../components/PlaceCard";
import {TAKE_BACK_PLAYED_PLACE} from "@bga/not-alone/moves/TakeBackPlayedPlace";

export const TakeBackPlayedPlaceUI = {
  playerInformation: (t, game, playerId) => {
    const hunted = getHunted(game, playerId)
    const place = getLegalMoves(game, playerId).find(move => move.type === TAKE_BACK_PLAYED_PLACE).place
    switch (hunted.discardedPlaceCards.length) {
      case 0:
        return t('You may take back {place} to your hand', {place: t(places[place].name)})
      case 1:
        return t('You may take back {place1} and {place2} to your hand', {place1: t(places[place].name), place2: t(places[hunted.discardedPlaceCards[0]].name)})
      default:
        return t('You may take back {place} and 1 Place card from your discard pile to your hand', {place: t(places[place].name)})
    }
  },

  defaultInformation: (t, game, playersMap, playerId) => {
    const player = playersMap[playerId].name
    const hunted = getHunted(game, playerId)
    const place = getLegalMoves(game, playerId).find(move => move.type === TAKE_BACK_PLAYED_PLACE).place
    switch (hunted.discardedPlaceCards.length) {
      case 0:
        return t('{player} may take back {place} in hand', {player, place: t(places[place].name)})
      case 1:
        return t('{player} may take back {place1} and {place2} in hand', {player, place1: t(places[place].name), place2: t(places[hunted.discardedPlaceCards[0]].name)})
      default:
        return t('{player} may take back {place} and 1 Place card {gender, select, ♀ {her} ♂ {his} other {their}} your discard pile in hand', {player, gender: playersMap[playerId].gender, place: t(places[place].name)})
    }
  }
}