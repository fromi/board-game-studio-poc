import {getHunted, getHuntedId, HUNT_CARD, HUNTING} from '../../NotAlone'
import {FORBIDDEN_ZONE} from '../HuntCards'
import {choosePlace} from '../../moves/ChoosePlace'
import {discardPlaceCard} from '../../moves/DiscardPlaceCard'

export const ForbiddenZone = {
  phase: HUNTING,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: FORBIDDEN_ZONE, huntedChosenPlace: {}},

  getHuntedMoves: (game, huntedId) => {
    const hunted = getHunted(game, huntedId)
    if (game.ongoingAction.huntedChosenPlace[huntedId] || hunted.handPlaceCards.length === 0) {
      return []
    }
    return hunted.handPlaceCards.map(place => choosePlace(huntedId, place))
  },

  choosePlace: (game, huntedId, place) => {
    game.ongoingAction.huntedChosenPlace[huntedId] = place
    if (game.hunted.filter(hunted => hunted.handPlaceCards.length > 0).every(hunted => game.ongoingAction.huntedChosenPlace[getHuntedId(game, hunted)])) {
      game.hunted.forEach(hunted => {
        const huntedId = getHuntedId(game, hunted)
        game.nextMoves.push(discardPlaceCard(huntedId, game.ongoingAction.huntedChosenPlace[huntedId]))
      })
      delete game.ongoingAction
    }
  }
}
