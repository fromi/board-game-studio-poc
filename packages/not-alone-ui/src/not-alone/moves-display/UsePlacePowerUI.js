import {getLegalMoves} from "@bga/not-alone";
import {USE_PLACE_POWER} from "@bga/not-alone/moves/UsePlacePower";
import {places} from "../components/PlaceCard";

export const UsePlacePowerUI = {
  playerInformation: (t, game, playerId) => {
    const place = getLegalMoves(game, playerId).find(move => move.type === USE_PLACE_POWER).place
    return t('You may use the power of {place}', {place: t(places[place].name)})
  },

  defaultInformation: (t, game, playersMap, playerId) => {
    const player = playersMap[playerId].name
    const place = getLegalMoves(game, playerId).find(move => move.type === USE_PLACE_POWER).place
    return t('{player} may use the power of {place}', {player, place: t(places[place].name)})
  }
}