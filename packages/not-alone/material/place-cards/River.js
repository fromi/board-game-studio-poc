import {THE_ARTEFACT, THE_RIVER} from "../PlaceCards"

export const River = {
  canUsePower: (game, hunted) => hunted.pendingPlacePower !== THE_ARTEFACT
}

export const mustChoosePlaceToReveal = hunted => hunted.pendingPlacePower === THE_RIVER && hunted.playedPlaceCards.length > 1