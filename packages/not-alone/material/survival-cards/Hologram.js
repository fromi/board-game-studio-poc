import {getAdjacentPlaces, RECKONING, SURVIVAL_CARD} from '../../NotAlone'
import {ARTEMIA_TOKEN} from '../HuntTokens'
import {HOLOGRAM} from '../SurvivalCards'
import {placeHuntToken} from '../../moves/PlaceHuntToken'

export const Hologram = {
  phase: RECKONING,

  canBePlayed: game => game.phase === RECKONING && game.huntTokensLocations[ARTEMIA_TOKEN].length > 0,

  playCard: (game, huntedId) => game.ongoingAction = {cardType: SURVIVAL_CARD, card: HOLOGRAM, huntedId},

  getHuntedMoves: (game, huntedId) => {
    if (game.ongoingAction.huntedId === huntedId) {
      const artemiaLocations = game.huntTokensLocations[ARTEMIA_TOKEN]
      return artemiaLocations.flatMap(locations => locations.map(getAdjacentPlaces)).filter(place => !artemiaLocations.includes(place)).map(place => placeHuntToken(ARTEMIA_TOKEN, [place]))
    } else {
      return []
    }
  }
}
