export const PutMarkerOnBeachUI = {
  playerInformation: (t) => t('You may place the Marker counter on the Beach'),

  defaultInformation: (t, game, playersMap, playerId) => {
    console.log("ICI")
    return t('{player} may place the Marker counter on the Beach', {player: playersMap[playerId].name})
  }
}