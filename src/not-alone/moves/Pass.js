import {CREATURE, getHunted} from "../NotAlone";

export const PASS = 'Pass'

export const pass = (playerId) => ({type: PASS, playerId})

export const Pass = {
  execute: (game, move) => {
    if (move.playerId === CREATURE) {
      game.creature.passed = true
    } else {
      getHunted(game, move.playerId).passed = true
    }
  }
}