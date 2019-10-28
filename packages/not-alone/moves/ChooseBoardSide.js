import {drawHuntCard} from './DrawHuntCard'
import {drawSurvivalCard} from './DrawSurvivalCard'
import {CREATURE, getPlayerIds} from '../NotAlone'
import {startPhase} from './StartPhase'
import {EXPLORATION} from '../Phases'

export const CHOOSE_BOARD_SIDE = 'ChooseBoardSide'

export const chooseBoardSide = (side) => ({type: CHOOSE_BOARD_SIDE, side})

export const ChooseBoardSide = {
  execute: (game, move) => {
    game.boardSide = move.side
    game.nextMoves.push(drawHuntCard(3))
    getPlayerIds(game).filter((playerId) => playerId !== CREATURE).forEach((playerId) => game.nextMoves.push(drawSurvivalCard(playerId, 1)))
    game.nextMoves.push(startPhase(EXPLORATION))
  }
}