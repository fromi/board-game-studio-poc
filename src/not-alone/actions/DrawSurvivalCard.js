import Action from "../../game-api/Action"
import {getPlayer} from "../NotAlone"

class DrawSurvivalCard extends Action {
  execute = (game, action) => {
    const hunted = getPlayer(game, action.playerId)
    hunted.handSurvivalCards.push(game.survivalCardsDeck.shift())
    hunted.pendingActions.shift()
  }

  getOwnView = (action, game) => ({...action, survivalCardDrawn: getPlayer(game, action.playerId).handSurvivalCards.slice(-1)[0]})

  reportInOwnView = (game, action) => {
    this.execute(game, action)
    getPlayer(game, action.playerId).handSurvivalCards.splice(-1, 1, action.survivalCardDrawn)
  }
}

export default new DrawSurvivalCard()