import {combineReducers} from "redux"
import {createPlayersReducer} from "./clients/PlayersReducer"
import {createSpectatorReducer} from "./clients/SpectatorReducer"

export function createClientsReducer(Game) {
  return combineReducers({players: createPlayersReducer(Game), spectator: createSpectatorReducer(Game)})
}