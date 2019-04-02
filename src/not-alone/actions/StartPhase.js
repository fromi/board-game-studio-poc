import Action from "../../game-api/Action"

class StartPhase extends Action {
  execute = (game, action) => {
    game.phase = action.phase
  }
}

export default new StartPhase()