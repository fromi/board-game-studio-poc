import Action from "../../game-api/Action"
import {getPlayer} from "../NotAlone"

class PlayPlaceCard extends Action {
  execute = (game, action) => {
    const player = getPlayer(game, action.playerId)
    player.handPlaceCards.splice(player.handPlaceCards.indexOf(action.place), 1)
    player.playedPlaceCards.push(action.place)
  }
}

export default new PlayPlaceCard()