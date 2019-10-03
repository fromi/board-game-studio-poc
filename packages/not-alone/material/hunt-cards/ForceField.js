import {TARGET_TOKEN} from '../HuntTokens'
import {ADJACENT_LOCATIONS, HUNT_CARD} from '../../NotAlone'
import {FORCE_FIELD} from '../HuntCards'
import {placeHuntToken} from '../../moves/PlaceHuntToken'
import {EXPLORATION} from '../../Phases'

export const ForceField = {
  phase: EXPLORATION,
  token: TARGET_TOKEN,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: FORCE_FIELD},

  getCreatureMoves: () => ADJACENT_LOCATIONS.forEach(adjacentLocations => placeHuntToken(TARGET_TOKEN, adjacentLocations)),
}
