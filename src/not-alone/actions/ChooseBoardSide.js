import Action from "../../game-api/Action"
import DrawHuntCards from "./DrawHuntCards"
import DrawSurvivalCard from "./DrawSurvivalCard"

class ChooseBoardSide extends Action {
  execute = (game, action) => {
    game.boardSide = action.side
    game.creature.pendingActions.shift()
    game.creature.pendingActions.push([{...DrawHuntCards.action, numberOfCards: 3}])
    game.hunted.forEach((hunted) => hunted.pendingActions.push([DrawSurvivalCard.action]))
  }
}

export default new ChooseBoardSide()