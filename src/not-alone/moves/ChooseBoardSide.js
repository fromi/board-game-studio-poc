import {drawHuntCards} from "./DrawHuntCards"
import {drawSurvivalCard} from "./DrawSurvivalCard"
import {CREATURE, getPlayerIds} from "../NotAlone"
import {startPhase} from "./StartPhase"

export const chooseBoardSide = (side) => ({type: 'ChooseBoardSide', side})

export const ChooseBoardSide = {
  execute: (game, move) => {
    game.boardSide = move.side
    game.nextMoves.push(drawHuntCards(3))
    getPlayerIds(game).filter((playerId) => playerId !== CREATURE).forEach((playerId) => game.nextMoves.push(drawSurvivalCard(playerId)))
    game.nextMoves.push(startPhase(1))
  }
}