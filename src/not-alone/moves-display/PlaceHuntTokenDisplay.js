import {CREATURE} from "../NotAlone";

export const PlaceHuntTokenDisplay = {
  playerInformation: (t) => t('You must place your Hunt tokens'),
  othersInformation: (t, game, playersMap) => t('{{player}} may place Hunt tokens on Artemia.', {player: playersMap[CREATURE].name, context: playersMap[CREATURE].gender}),
}