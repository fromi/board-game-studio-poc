import {shuffle} from "../game-api/Random"
import SurvivalCards from "./material/SurvivalCards"
import HuntCards from "./material/HuntCards"
import {hideItemsDetail} from "../game-api/Secrets"
import {ChooseBoardSide, chooseBoardSide} from "./moves/ChooseBoardSide"
import {DrawHuntCard} from "./moves/DrawHuntCard"
import {DrawSurvivalCard} from "./moves/DrawSurvivalCard"
import {StartPhase} from "./moves/StartPhase"
import {PlayPlaceCard, playPlaceCard} from "./moves/PlayPlaceCard"
import {StrikeBack} from "./moves/StrikeBack"
import {ShuffleHuntCards} from "./moves/ShuffleHuntCards"

export const CREATURE = 'Creature', HUNTED_PREFIX = 'Hunted ', BOARD_SIDES = [1, 2]

/**
 * Setup a new Game.
 * @param options Game options (for example, number of players
 * @return {Object} Game state before the first player move
 */
export const setup = options => ({
  creature: {hand: []},
  hunted: setupHunted(options.numberOfPlayers),
  assimilationCounter: 5 + options.numberOfPlayers,
  rescueCounter: 11 + options.numberOfPlayers,
  markerCounterOnBeach: false,
  reserve: setupReserve(options.numberOfPlayers),
  survivalCardsDeck: shuffle(SurvivalCards),
  huntCardsDeck: shuffle(HuntCards),
  huntCardsDiscard: [],
  nextMoves: []
})

function setupHunted(numberOfPlayers) {
  const hunted = []
  for (let playerNumber = 1; playerNumber < numberOfPlayers; playerNumber++) {
    hunted.push({willCounters: 3, handPlaceCards: [1, 2, 3, 4, 5], handSurvivalCards: [], playedPlaceCards:[]})
  }
  return hunted
}

function setupReserve(numberOfPlayers) {
  const reserveSize = numberOfPlayers < 3 ? 1 : numberOfPlayers < 5 ? 2 : 3
  return {6: reserveSize, 7: reserveSize, 8: reserveSize, 9: reserveSize, 10: reserveSize}
}

/**
 * Get the identifiers of the players in a game
 * @param game The game
 * @return {string[]} The identifiers of the players
 */
export function getPlayerIds(game) {
  return [CREATURE].concat(game.hunted.map((hunted, index) => HUNTED_PREFIX + (index + 1)))
}

export const moves = {ChooseBoardSide, DrawHuntCard, DrawSurvivalCard, StartPhase, PlayPlaceCard, ShuffleHuntCards, StrikeBack}

export function getAutomaticMove(game) {
  return game.nextMoves[0]
}

/**
 * Get all legal moves for a given player at a given state of his game
 * @param game Current state of a game
 * @param playerId Identifier of the player
 * @return {[]} The player legal moves at this state of the game
 */
export function getMandatoryMoves(game, playerId) {
  return playerId === CREATURE ? getCreatureMandatoryMoves(game) : getHuntedMandatoryMoves(game, getHunted(game, playerId))
}

function getCreatureMandatoryMoves(game) {
  if (!game.boardSide) {
    return BOARD_SIDES.map(side => chooseBoardSide(side))
  }
  return []
}

function getHuntedMandatoryMoves(game, hunted) {
  if (game.phase === 1 && !explorationDone(hunted)) {
    return hunted.handPlaceCards.map(place => playPlaceCard(place))
  }
  return []
}

export function getOptionalMoves(game, playerId) {
  return []
}

export function getHunted(game, huntedPlayerId) {
  return game.hunted[getHuntedNumber(huntedPlayerId) - 1]
}

export function explorationDone(hunted) {
  return hunted.playedPlaceCards.length === 1
}

function getHuntedNumber(playerId) {
  return parseInt(playerId.slice(HUNTED_PREFIX.length))
}

export function getPlayerView(game, playerId) {
  const view = getSpectatorView(game)
  if (playerId === CREATURE) {
    view.creature = game.creature
  } else {
    const huntedIndex = getHuntedNumber(playerId) - 1
    view.hunted[huntedIndex] = game.hunted[huntedIndex]
  }
  return view
}

export function getSpectatorView(game) {
  return {
    ...game,
    huntCardsDeck: hideItemsDetail(game.huntCardsDeck),
    survivalCardsDeck: hideItemsDetail(game.survivalCardsDeck),
    creature: hideCreatureSecrets(game),
    hunted: game.hunted.map((hunted) => hideHuntedSecrets(hunted))
  }
}

function hideCreatureSecrets(game) {
  return {...game.creature, hand: hideItemsDetail(game.creature.hand)}
}

function hideHuntedSecrets(hunted) {
  return {...hunted,
    handPlaceCards: hideItemsDetail(hunted.handPlaceCards),
    handSurvivalCards: hideItemsDetail(hunted.handSurvivalCards),
    playedPlaceCards: hideItemsDetail(hunted.playedPlaceCards)
  }
}
