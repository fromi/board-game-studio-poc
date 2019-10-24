import {CREATURE} from "@bga/not-alone"

export const DrawHuntCardUI = {
  animationInformation: (t, {playerId, playersMap}) => playerId === CREATURE ?
    t('You draw 3 Hunt cards') :
    t('{player} draws 3 Hunt cards', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender})
}