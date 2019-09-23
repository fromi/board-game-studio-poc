import {THE_RIVER} from "../PlaceCards";

export const Artefact = {
  canUsePower: (game, hunted) => hunted.pendingPlacePower !== THE_RIVER
}