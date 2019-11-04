import {getAdjacentPlaces, getHunted, SURVIVAL_CARD} from '../../NotAlone'
import {getExploredPlaces, getPlaceBeingResolved, placePowerIsEffective} from '../../phases/Reckoning'
import {GATE} from '../SurvivalCards'
import {RECKONING} from '../../Phases'
import {placeRule} from '../PlaceCards'
import {copyPlacePower} from '../../moves/CopyPlacePower'

export const Gate = {
  phase: RECKONING,

  canBePlayed: (game, huntedId) => game.phase === RECKONING && getExploredPlaces(game, getHunted(game, huntedId)).some(place => placePowerIsEffective(game, huntedId, place)),

  playCard: (game, huntedId) => game.pendingEffects.push({cardType: SURVIVAL_CARD, card: GATE, huntedId}),

  activatesInsteadOfUsingPlacePower: true,

  getHuntedMoves: (game, huntedId) => getAdjacentPlaces(getPlaceBeingResolved(game, huntedId)).filter(place => !placeRule(place).copyForbidden).map(place => copyPlacePower(place, huntedId))
}
