import {huntCardRule} from '../material/HuntCards'

export const PLAY_HUNT_CARD = 'PlayHuntCard'

export const playHuntCard = card => ({type: PLAY_HUNT_CARD, card})

export const PlayHuntCard = {
  execute: (game, move) => {
    game.creature.hand.splice(game.creature.hand.indexOf(move.card), 1)
    game.creature.huntCardsPlayed.push(move.card)
    const huntCardRule = huntCardRule(move.card)
    if (huntCardRule.playCard) {
      huntCardRule.playCard(game)
    }
    game.hunted.forEach(hunted => hunted.passed = false)
  }
}