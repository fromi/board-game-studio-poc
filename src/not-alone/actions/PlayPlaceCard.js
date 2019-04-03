import Action from "../../game-api/Action"
import {getPlayer} from "../NotAlone"

class PlayPlaceCard extends Action {
  execute = (game, action) => {
    const hunted = getPlayer(game, action.playerId)
    hunted.handPlaceCards.splice(hunted.handPlaceCards.indexOf(action.place), 1)
    hunted.playedPlaceCards.push(action.place)
  }

  cancelable = (game, action) => {
    const hunted = getPlayer(game, action.playerId)
    return game.phase === 1 && hunted.playedPlaceCards.includes(action.place)
  }

  cancel = (game, action) => {
    const hunted = getPlayer(game, action.playerId)
    hunted.playedPlaceCards.splice(hunted.playedPlaceCards.indexOf(action.place), 1)
    hunted.handPlaceCards.push(action.place)
  }

  getOwnView = (action) => action

  getView = (action) => {
    return {...action, place: {}}
  }
}

export default new PlayPlaceCard()