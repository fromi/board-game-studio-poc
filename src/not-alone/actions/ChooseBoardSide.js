import Action from "../../game-api/Action"
import DrawHuntCards from "./DrawHuntCards"
import DrawSurvivalCard from "./DrawSurvivalCard"
import {CREATURE, getPlayerIds} from "../NotAlone"
import StartPhase from "./StartPhase"

class ChooseBoardSide extends Action {
  execute = (game, action) => {
    game.boardSide = action.side
    game.creature.pendingActions.shift()
    game.pendingActions.push({...DrawHuntCards.action, numberOfCards: 3})
    getPlayerIds(game).filter((playerId) => playerId !== CREATURE).forEach((playerId) => game.pendingActions.push({...DrawSurvivalCard.action, playerId}))
    game.pendingActions.push({...StartPhase.action, phase: 1})
  }
}

export default new ChooseBoardSide()