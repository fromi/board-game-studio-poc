import {getHuntedId, HUNT_CARD} from '../../NotAlone'
import {ANTICIPATION} from '../HuntCards'
import {chooseHunted} from '../../moves/ChooseHunted'
import {CREATURE_TOKEN} from '../HuntTokens'
import {moveAssimilationCounter} from '../../moves/MoveAssimilationCounter'

export const Anticipation = {
  phase: 2,

  playCard: game => game.ongoingAction = {cardType: HUNT_CARD, card: ANTICIPATION},

  getCreatureMoves: game => game.hunted.map(hunted => chooseHunted(getHuntedId(game, hunted))),

  chooseHunted: (game, huntedId) => {
    game.ongoingAction.huntedId = huntedId
    game.pendingEffects.push(game.ongoingAction)
    delete game.ongoingAction
  },

  huntedCaught: (game, huntedId, token) => {
    if (token === CREATURE_TOKEN && game.pendingEffects.find(effect => effect.card === ANTICIPATION).huntedId === huntedId) {
      game.nextMoves.push(moveAssimilationCounter)
    }
  }
}
