import {takeBackPlayedPlace} from "../../moves/TakeBackPlayedPlace";
import {THE_JUNGLE} from "../PlaceCards";

export const Jungle = {
  getPowerMoves: (game, huntedId) => [takeBackPlayedPlace(huntedId, THE_JUNGLE)]
}