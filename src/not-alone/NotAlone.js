import {shuffle} from "../game-api/Random"
import SurvivalCards from "./material/SurvivalCards"
import HuntCards from "./material/HuntCards"
import {hideItemsDetail} from "../game-api/Secrets"
import ChooseBoardSide from "./actions/ChooseBoardSide"
import DrawHuntCards from "./actions/DrawHuntCards"
import DrawSurvivalCard from "./actions/DrawSurvivalCard"
import StrikeBack from "./actions/StrikeBack"
import ShuffleHuntCards from "./actions/ShuffleHuntCards"

const CREATURE = 'Creature', HUNTED_PREFIX = 'Hunted '

/**
 * Setup a new Game.
 * @param options Game options (for example, number of players
 * @return {Object} Game state before the first player action
 */
export const setup = options => ({
  creature: {hand: [], pendingActions: [[{...ChooseBoardSide.action, side: 1}, {...ChooseBoardSide.action, side: 2}]]},
  hunted: setupHunted(options.numberOfPlayers),
  assimilationCounter: 5 + options.numberOfPlayers,
  rescueCounter: 11 + options.numberOfPlayers,
  markerCounterOnBeach: false,
  reserve: setupReserve(options.numberOfPlayers),
  survivalCardsDeck: shuffle(SurvivalCards),
  huntCardsDeck: shuffle(HuntCards),
  huntCardsDiscard: []
})

function setupHunted(numberOfPlayers) {
  const hunted = []
  for (let playerNumber = 1; playerNumber < numberOfPlayers; playerNumber++) {
    hunted.push({willCounters: 3, handPlaceCards: [1, 2, 3, 4, 5], handSurvivalCards: [], pendingActions: []})
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

export const actions = [ChooseBoardSide, DrawHuntCards, DrawSurvivalCard, ShuffleHuntCards, StrikeBack]

/**
 * Get all legal actions for a given player at a given state of his game
 * @param game Current state of a game
 * @param playerId Identifier of the player
 * @return {[]} The player legal actions at this state of the game
 */
export function getLegalActions(game, playerId) {
  const player = getPlayer(game, playerId)
  if (player.pendingActions.length > 0) {
    return player.pendingActions[0]
  }
  return [StrikeBack.action]
}

export function getPlayer(game, playerId) {
  if (playerId === CREATURE) {
    return game.creature
  } else {
    return game.hunted[getHuntedNumber(playerId) - 1]
  }
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
  return {...hunted, handPlaceCards: hideItemsDetail(hunted.handPlaceCards), handSurvivalCards: hideItemsDetail(hunted.handSurvivalCards)}
}
