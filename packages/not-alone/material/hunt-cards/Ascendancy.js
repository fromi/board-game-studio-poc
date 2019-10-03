import {getHunted, getHuntedId, HUNT_CARD} from '../../NotAlone'
import {ASCENDANCY} from '../HuntCards'
import {chooseHunted} from '../../moves/ChooseHunted'
import {discardPlaceCard} from '../../moves/DiscardPlaceCard'
import {HUNTING} from '../../Phases'

const PLACES_TO_KEEP = 2

export const Ascendancy = {
  phase: HUNTING,

  canBePlayed: game => game.phase === HUNTING && game.hunted.some(hunted => hunted.handPlaceCards.length > PLACES_TO_KEEP),

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: ASCENDANCY},

  getCreatureMoves: game => {
    if (!game.ongoingAction.huntedId) {
      return game.hunted.filter(hunted => hunted.handPlaceCards.length > PLACES_TO_KEEP).map(hunted => chooseHunted(getHuntedId(game, hunted)))
    } else {
      return []
    }
  },

  chooseHunted: (game, huntedId) => {
    game.ongoingAction.huntedId = huntedId
  },

  getHuntedMoves: (game, huntedId) => {
    if (huntedId === game.ongoingAction.huntedId) {
      return getHunted(game, huntedId).handPlaceCards.map(place => discardPlaceCard(huntedId, place))
    } else {
      return []
    }
  },

  continueGameAfterMove: (game) => {
    if (game.ongoingAction.huntedId && getHunted(game, game.ongoingAction.huntedId).handPlaceCards.length <= PLACES_TO_KEEP) {
      delete game.ongoingAction
    }
  }
}
