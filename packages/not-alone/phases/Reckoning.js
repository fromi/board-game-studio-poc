import {revealPlaceCards} from "../moves/RevealPlaceCard";
import {startPhase} from "../moves/StartPhase";
import {creatureShouldPassOrPlayHuntCard, getHunted, HUNTED_PREFIX, shouldPassOrPlaySurvivalCard} from "../NotAlone";
import {placeRule} from "../material/PlaceCards";
import {usePlacePower} from "../moves/UsePlacePower";
import {HUNT_TOKENS} from "../material/HuntTokens";

export const Reckoning = {
  getAutomaticMove: game => {
    // TODO: The River: players must take back a place card before revealing
    for (const hunted of game.hunted) {
      if (!hunted.playedPlaceCardsRevealed) {
        return revealPlaceCards(HUNTED_PREFIX + (game.hunted.indexOf(hunted) + 1))
      }
    }
    if (!nextHuntedExploringPlaceWithoutHuntToken(game)) {
      // TODO: Solve Hunt Tokens effects
      return startPhase(4)
    }
  },

  getHuntedMoves: (game, huntedId) => {
    if (game.hunted.some(hunted => shouldPassOrPlaySurvivalCard(game, hunted)) && creatureShouldPassOrPlayHuntCard(game)) {
      return []
    }
    const hunted = getHunted(game, huntedId)
    const moves = []
    if (nextHuntedExploringPlaceWithoutHuntToken(game) === hunted) {
      const places = getPlacesToExplore(game, hunted)
      if (places.length === 1) {
        const place = places[0]
        const Place = placeRule(place)
        if (Place.canUsePower(game, hunted)) {
          moves.push(usePlacePower(place, huntedId))
        } else if (!hunted.discardedPlaceCards.length) {
          // TODO moves.push(passPlaceReckoning) -> Place power cannot be used and player has 0 place card discarded
        }
        if (hunted.discardedPlaceCards.length) {
          // TODO moves.push(takeBackDiscardedPlace)
        }
      } else {
        // TODO Artefact choosePlaceToResolve
      }
    }
    return moves
  }
}

function nextHuntedExploringPlaceWithoutHuntToken(game) {
  return game.hunted.find(hunted => getPlacesToExplore(game, hunted).length > 0)
}

function getPlacesToExplore(game, hunted) {
  return getHuntedFinalPlaces(game, hunted).filter(place => !hunted.resolvedPlaceCards.includes(place))
    .filter(place => !HUNT_TOKENS.some(huntToken => game.huntTokensLocations[huntToken].includes(place)))
}

function getHuntedFinalPlaces(game, hunted) {
  return hunted.playedPlaceCards // TODO: Detour
}

export function getPlaceBeingResolved(game, huntedId) {
  const hunted = getHunted(game, huntedId)
  if (hunted.playedPlaceCards.length === 1) {
    return hunted.playedPlaceCards[0]
  } else {
    // TODO Artefact: return hunted.placeBeingResolved
  }
}