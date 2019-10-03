import {getAdjacentPlaces, SURVIVAL_CARD} from '../../NotAlone'
import {CREATURE_TOKEN} from '../HuntTokens'
import {placeHuntToken} from '../../moves/PlaceHuntToken'
import {WRONG_TRACK} from '../SurvivalCards'
import {RECKONING} from '../../Phases'

export const WrongTrack = {
  phase: RECKONING,

  playCard: (game, huntedId) => game.ongoingAction = {cardType: SURVIVAL_CARD, card: WRONG_TRACK, huntedId},

  getHuntedMoves: (game, huntedId) => {
    if (game.ongoingAction.huntedId === huntedId) {
      const creatureLocations = game.huntTokensLocations[CREATURE_TOKEN]
      return creatureLocations.flatMap(locations => locations.map(getAdjacentPlaces)).filter(place => !creatureLocations.includes(place)).map(place => placeHuntToken(CREATURE_TOKEN, [place]))
    } else {
      return []
    }
  }
}
