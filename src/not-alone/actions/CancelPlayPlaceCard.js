import Action from "../../game-api/Action"
import {getPlayer} from "../NotAlone"

class CancelPlayPlaceCard extends Action {
  execute = (game, action) => {
    const player = getPlayer(game, action.playerId)
    player.playedPlaceCards.splice(player.playedPlaceCards.indexOf(action.place), 1)
    player.handPlaceCards.push(action.place)
  }
}

export default new CancelPlayPlaceCard()