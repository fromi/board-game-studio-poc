export const REMOVE_HUNT_TOKEN = 'RemoveHuntToken'

export const removeHuntToken = (token) => ({type: REMOVE_HUNT_TOKEN, token})

export const RemoveHuntToken = {
  execute: (game, move) => {
    game.huntTokensLocations[move.token] = []
  }
}