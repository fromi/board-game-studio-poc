import {ARTEMIA_TOKEN} from '../HuntTokens'
import {CREATURE, getHunted, getHuntedId, HUNT_CARD, HUNTING} from '../../NotAlone'
import {ASCENDANCY} from '../HuntCards'
import {chooseHunted} from '../../moves/ChooseHunted'
import {choosePlace} from '../../moves/ChoosePlace'

const PLACES_TO_KEEP_SECRET = 2

export const Phobia = {
  phase: HUNTING,
  token: ARTEMIA_TOKEN,

  canBePlayed: game => game.phase === HUNTING && game.hunted.some(hunted => hunted.handPlaceCards.length > PLACES_TO_KEEP_SECRET),

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: ASCENDANCY},

  getCreatureMoves: game => {
    if (!game.ongoingAction.huntedId) {
      return game.hunted.filter(hunted => hunted.handPlaceCards.length > PLACES_TO_KEEP_SECRET).map(hunted => chooseHunted(getHuntedId(game, hunted)))
    } else {
      return []
    }
  },

  chooseHunted: (game, huntedId) => {
    game.ongoingAction.huntedId = huntedId
    game.ongoingAction.revealedCards = []
  },

  getHuntedMoves: (game, huntedId) => {
    if (huntedId === game.ongoingAction.huntedId) {
      return getHunted(game, huntedId).handPlaceCards.filter(place => !game.ongoingAction.revealedCards.includes(place)).map(place => choosePlace(huntedId, place))
    } else {
      return []
    }
  },

  choosePlace: (game, place, huntedId) => {
    game.ongoingAction.revealedCards.push(place)
    if (game.ongoingAction.revealedCards.length === huntedId.handPlaceCards.length + PLACES_TO_KEEP_SECRET) {
      delete game.ongoingAction
    }
  },

  shouldHideChosenPlaceTo: (playerId, move) => playerId !== move.playerId && playerId !== CREATURE
}
