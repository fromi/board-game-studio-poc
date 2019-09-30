import {THE_RIVER} from '../PlaceCards'
import {getHunted} from '../../NotAlone'
import {continueReckoning} from '../../phases/Reckoning'

export const River = {
  canUsePower: (game, hunted) => !hunted.pendingPlacePower,

  usePower: (game, huntedId) => {
    getHunted(game, huntedId).pendingPlacePower = THE_RIVER
    continueReckoning(game)
  }
}

export const mustChoosePlaceToReveal = hunted => hunted.pendingPlacePower === THE_RIVER && hunted.playedPlaceCards.length > 1