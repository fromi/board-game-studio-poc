import {CREATURE} from "../NotAlone";

export const PlaceHuntTokenDisplay = {
  playerInformation: (t) => t('You may place the Creature token on Artemia'),
  defaultInformation: (t, game, playersMap) => t('{player} may place the Creature token on Artemia.', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender}),
}