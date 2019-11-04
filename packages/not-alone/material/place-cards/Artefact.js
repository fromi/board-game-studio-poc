import {getHunted} from '../../NotAlone'
import {THE_ARTEFACT} from '../PlaceCards'
import {continueReckoning, getCurrentHuntedId, placePowerMoves} from '../../phases/Reckoning'
import {choosePlace} from '../../moves/ChoosePlace'

export const Artefact = {
  canUsePower: (game, hunted) => !hunted.pendingPlacePower,
  copyForbidden: true,

  usePower: (game, huntedId) => {
    getHunted(game, huntedId).pendingPlacePower = THE_ARTEFACT
    continueReckoning(game)
  },

  getMovesForMultipleResolution: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    if (hunted.resolvingPlace) {
      return placePowerMoves(game, huntedId, hunted.resolvingPlace)
    } else {
      return hunted.playedPlaceCards.map(place => choosePlace(huntedId, place))
    }
  },

  currentHuntedStartsSecondPlaceResolution: game => {
    if (game.reckoning.huntedIndex !== -1) {
      const hunted = getHunted(game, getCurrentHuntedId(game))
      if (hunted.resolvingPlace) {
        if (hunted.resolvedPlace) {
          delete hunted.resolvingPlace
          delete hunted.resolvedPlace
        } else {
          hunted.resolvedPlace = hunted.resolvingPlace
          hunted.resolvingPlace = hunted.playedPlaceCards.find(place => place !== hunted.resolvedPlace)
          return true
        }
      }
    }
    return false
  }
}