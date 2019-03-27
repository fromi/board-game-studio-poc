export default class Game {
  /**
   * Setup a new Game. We do not use constructor because it is often necessary do reconstruct the game from Json data.
   */
  setup() {
  }

  /**
   * Returns the array of players ids
   */
  getPlayerIds() {
  }

  /**
   * Return all the actions that given player is currently allowed to perform in the game.
   * @param playerId
   * @return {Array} The player legal actions
   */
  getLegalActions(playerId) {
  }

  /**
   * If some action must be taken prior to another action (for example, shuffling the discard before drawing when a deck is empty)
   * @param action Action that is going to be taken, unless another action must be taken before
   * @return Action|null the action that must be taken prior to given action, or null if there is no prior action
   */
  getPriorAction(action) {
    return null
  }

  /**
   * Transforms an action just before it is taken
   * Useful for determining the random outputs of the future action
   * Can also be used to replace an action by another action that need to be taken before (for instance, shuffling a deck)
   * @param action The action that a player wants to take
   * @return The action that should be taken
   */
  prepareRandomAction(action) {
    return action
  }

  executeAction(action) {
  }

  getPlayerView(playerId) {
  }

  getSpectatorView() {
  }
}
