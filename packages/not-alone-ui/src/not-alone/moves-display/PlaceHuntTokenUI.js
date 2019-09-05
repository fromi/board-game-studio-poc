import {CREATURE} from "@bga/not-alone";

export const PlaceHuntTokenUI = {
  playerInformation: (t) => t('You may place the Creature token on Artemia'),
  defaultInformation: (t, game, playersMap) => t('{player} may place the Creature token on Artemia.', {player: playersMap[CREATURE].name, gender: playersMap[CREATURE].gender}),
}