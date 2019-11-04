import {getHunted, SURVIVAL_CARD} from '../../NotAlone'
import {getExploredPlaces, placePowerIsEffective} from '../../phases/Reckoning'
import {DRONE} from '../SurvivalCards'
import {THE_ROVER} from '../PlaceCards'
import {RECKONING} from '../../Phases'
import {copyPlacePower} from '../../moves/CopyPlacePower'

export const Drone = {
  phase: RECKONING,

  canBePlayed: (game, huntedId) => game.phase === RECKONING && getExploredPlaces(game, getHunted(game, huntedId)).some(place => placePowerIsEffective(game, huntedId, place)),

  playCard: (game, huntedId) => game.pendingEffects.push({cardType: SURVIVAL_CARD, card: DRONE, huntedId}),

  activatesInsteadOfUsingPlacePower: true,

  getHuntedMoves: (game, huntedId) => [copyPlacePower(THE_ROVER, huntedId)]
}
