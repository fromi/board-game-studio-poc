import {getHunted} from "../NotAlone";

export const THE_LAIR = 1, THE_JUNGLE = 2, THE_RIVER = 3, THE_BEACH = 4, THE_ROVER = 5,
  THE_SWAMP = 6, THE_SHELTER = 7, THE_WRECK = 8, THE_SOURCE = 9, THE_ARTEFACT = 10

export const markPlaceResolved = (game, huntedId, place) => {
  const hunted = getHunted(game, huntedId)
  if (hunted.playedPlaceCards.indexOf(place) !== -1 && hunted.resolvedPlaceCards.indexOf(place) === -1) {
    hunted.resolvedPlaceCards.push(place)
  }
}