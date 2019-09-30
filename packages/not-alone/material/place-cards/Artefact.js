import {getHunted} from '../../NotAlone'
import {THE_ARTEFACT} from '../PlaceCards'
import {continueReckoning} from '../../phases/Reckoning'

export const Artefact = {
  canUsePower: (game, hunted) => !hunted.pendingPlacePower,

  usePower: (game, huntedId) => {
    getHunted(game, huntedId).pendingPlacePower = THE_ARTEFACT
    continueReckoning(game)
  }
}