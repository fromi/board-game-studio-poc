import {getHuntedId, HUNT_CARD} from '../../NotAlone'
import {ANTICIPATION} from '../HuntCards'
import {chooseHunted} from '../../moves/ChooseHunted'

export const Anticipation = {
  phase: 2,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: ANTICIPATION},

  getCreatureMoves: game => game.hunted.map(hunted => chooseHunted(getHuntedId(game, hunted))),

  chooseHunted: (game, huntedId) => {
    game.ongoingAction.huntedId = huntedId
    game.pendingEffects.push(game.ongoingAction)
    delete game.ongoingAction
  }
}
