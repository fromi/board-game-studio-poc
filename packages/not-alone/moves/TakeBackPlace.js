import {continueGameAfterMove, getHunted} from '../NotAlone'
import {RESIST} from './Resist'

export const TakeBackPlace = {
  execute: (game, move, getCardOrigin) => {
    const hunted = getHunted(game, move.huntedId)
    const cardOrigin = getCardOrigin(hunted)
    cardOrigin.splice(cardOrigin.indexOf(move.place), 1)
    hunted.handPlaceCards.push(move.place)
    hunted.handPlaceCards.sort()
    if (hunted.ongoingAction && hunted.ongoingAction.type === RESIST) {
      hunted.ongoingAction.cardsLeft--
      if (!hunted.ongoingAction.cardsLeft || !hunted.discardedPlaceCards.length) {
        delete hunted.ongoingAction
      }
    } else {
      continueGameAfterMove(game, move)
    }
  },

  reportInView: (game, move, playerId) => {
    if (playerId !== move.huntedId) {
      const hunted = getHunted(game, move.huntedId)
      hunted.handPlaceCards = hunted.handPlaceCards.map(() => ({}))
    }
  }
}