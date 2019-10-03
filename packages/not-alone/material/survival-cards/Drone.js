import {getHunted, SURVIVAL_CARD} from '../../NotAlone'
import {getExploredPlaces, placePowerIsEffective} from '../../phases/Reckoning'
import {DRONE} from '../SurvivalCards'
import {usePlacePower} from '../../moves/UsePlacePower'
import {THE_ROVER} from '../PlaceCards'
import {RECKONING} from '../../Phases'

export const Drone = {
  phase: RECKONING,

  canBePlayed: (game, huntedId) => game.phase === RECKONING && getExploredPlaces(game, getHunted(game, huntedId)).some(place => placePowerIsEffective(game, huntedId, place)),

  playCard: (game, huntedId) => game.pendingEffects.push({cardType: SURVIVAL_CARD, card: DRONE, huntedId}),

  activatesInsteadOfUsingPlacePower: true,

  getHuntedMoves: (game, huntedId) => [usePlacePower(THE_ROVER, huntedId)]
}
