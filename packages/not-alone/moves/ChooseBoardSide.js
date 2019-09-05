import {drawHuntCard} from "./DrawHuntCard"
import {drawSurvivalCard} from "./DrawSurvivalCard"
import {CREATURE, getPlayerIds} from "../NotAlone"
import {startPhase} from "./StartPhase"

export const CHOOSE_BOARD_SIDE = 'ChooseBoardSide'

export const chooseBoardSide = (side) => ({type: CHOOSE_BOARD_SIDE, side})

export const ChooseBoardSide = {
  execute: (game, move) => {
    game.boardSide = move.side
    game.nextMoves.push(drawHuntCard, drawHuntCard, drawHuntCard)
    getPlayerIds(game).filter((playerId) => playerId !== CREATURE).forEach((playerId) => game.nextMoves.push(drawSurvivalCard(playerId)))
    game.nextMoves.push(startPhase(1))
  }
}