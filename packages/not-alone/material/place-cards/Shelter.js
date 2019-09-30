import {THE_SHELTER} from '../PlaceCards'
import {drawSurvivalCard} from '../../moves/DrawSurvivalCard'
import {getCurrentHuntedId} from '../../phases/Reckoning'
import {discardSurvivalCard} from '../../moves/DiscardSurvivalCard'
import {PLACE_CARD} from '../../NotAlone'

export const Shelter = {
  canUsePower: (game) => game.survivalCardsDeck.length > 0,

  usePower: (game, huntedId) => {
    game.ongoingAction = {cardType: PLACE_CARD, card: THE_SHELTER, survivalCards: []}
    game.nextMoves.push(drawSurvivalCard(huntedId), drawSurvivalCard(huntedId))
  },

  getPlayerMoves: (game, playerId) => {
    if (playerId === getCurrentHuntedId(game)) {
      return game.ongoingAction.survivalCards.map(card => discardSurvivalCard(playerId, card))
    }
  }
}