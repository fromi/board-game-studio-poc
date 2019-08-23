import {CREATURE} from "../NotAlone";

export const PlaceHuntTokenDisplay = {
  playerInformation: (t) => t('You must place the Creature token on Artemia'),
  othersInformation: (t, game, playersMap) => t('{player} must place the Creature token on Artemia.', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender}),
}