import {canHuntCardBePlayed, huntCardRule} from '../HuntCards'

export const Flashback = {
  canBePlayed: game => game.huntCardsDiscard.length > 0 && canHuntCardBePlayed(game, game.huntCardsDiscard[game.huntCardsDiscard.length - 1]),

  playCard: game => huntCardRule(game.huntCardsDiscard[game.huntCardsDiscard.length - 1]).playCard(game),
}
