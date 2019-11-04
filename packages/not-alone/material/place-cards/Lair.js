import {getHunted, getPlacesWithToken, PLACE_CARD} from '../../NotAlone'
import {CREATURE_TOKEN} from '../HuntTokens'
import {placeRule, THE_LAIR} from '../PlaceCards'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {takeBackAllDiscardedPlaces} from '../../moves/TakeBackAllDiscardedPlaces'
import {PERSECUTION} from '../HuntCards'
import {takeBackDiscardedPlace} from '../../moves/TakeBackDiscardedPlace'
import {copyPlacePower} from '../../moves/CopyPlacePower'

export const Lair = {
  canUsePower: (game, hunted) => hunted.discardedPlaceCards.length > 0 || getPlacesWithToken(game, CREATURE_TOKEN).some(place => !placeRule(place).copyForbidden),

  powerAllowsToTakeBackFromDiscard: true,

  usePower: (game) => game.ongoingAction = {cardType: PLACE_CARD, card: THE_LAIR},

  getHuntedMoves: (game, huntedId) => {
    const moves = []
    if (huntedId === getCurrentHuntedId(game)) {
      const hunted = getHunted(game, huntedId)
      if (hunted.discardedPlaceCards.length > 0) {
        if (game.pendingEffects.some(effect => effect.card === PERSECUTION)) {
          hunted.discardedPlaceCards.forEach(place => moves.push(takeBackDiscardedPlace(huntedId, place)))
        } else {
          moves.push(takeBackAllDiscardedPlaces(huntedId))
        }
      }
      getPlacesWithToken(game, CREATURE_TOKEN).filter(place => !placeRule(place).copyForbidden).forEach(place => moves.push(copyPlacePower(place, huntedId)))
    }
    return moves
  }
}