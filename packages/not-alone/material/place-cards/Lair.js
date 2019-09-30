import {getHunted, getPlacesWithToken} from '../../NotAlone'
import {CREATURE_TOKEN} from '../HuntTokens'
import {placeRule, THE_LAIR} from '../PlaceCards'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {takeBackAllDiscardedPlaces} from '../../moves/TakeBackAllDiscardedPlaces'
import {usePlacePower} from '../../moves/UsePlacePower'

export const Lair = {
  canUsePower: (game, hunted) => hunted.discardedPlaceCards.length > 0 || Lair.canCopyCreaturePlace(game, hunted),
  canCopyCreaturePlace: (game, hunted) => getPlacesWithToken(game, CREATURE_TOKEN).some(place => placeRule(place).canUsePower(game, hunted)),

  powerAllowsToTakeBackFromDiscard: true,

  usePower: (game) => game.pendingEffect = {cardType: 'PLACE_CARD', card: THE_LAIR},

  getPlayerMoves: (game, huntedId) => {
    const moves = []
    if (huntedId === getCurrentHuntedId(game)) {
      const hunted = getHunted(game, huntedId)
      if (hunted.discardedPlaceCards.length > 0) {
        moves.push(takeBackAllDiscardedPlaces(huntedId))
      }
      getPlacesWithToken(game, CREATURE_TOKEN).filter(place => placeRule(place).canUsePower(game, hunted)).forEach(place => usePlacePower(place, huntedId))
    }
    return moves
  }
}