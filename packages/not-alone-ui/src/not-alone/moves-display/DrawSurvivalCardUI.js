export const DrawSurvivalCardUI = {
  animationInformation: (t, {playerId, animation, playersMap}) => playerId === animation.move.huntedId ?
    t('You draw a Survival card') :
    t('{player} draws a Survival card', {player: playersMap[animation.move.huntedId].name, gender: playersMap[animation.move.huntedId].gender})
}