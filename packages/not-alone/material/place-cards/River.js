import {THE_ARTEFACT} from "../PlaceCards";

export const River = {
  canUsePower: (game, hunted) => hunted.pendingPlacePower !== THE_ARTEFACT
}