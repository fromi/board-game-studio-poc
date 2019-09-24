import {Lair} from "./place-cards/Lair"
import {Jungle} from "./place-cards/Jungle"
import {River} from "./place-cards/River"
import {Beach} from "./place-cards/Beach"
import {Rover} from "./place-cards/Rover"
import {Swamp} from "./place-cards/Swamp"
import {Shelter} from "./place-cards/Shelter"
import {Wreck} from "./place-cards/Wreck"
import {Source} from "./place-cards/Source"
import {Artefact} from "./place-cards/Artefact"

export const THE_LAIR = 1, THE_JUNGLE = 2, THE_RIVER = 3, THE_BEACH = 4, THE_ROVER = 5,
  THE_SWAMP = 6, THE_SHELTER = 7, THE_WRECK = 8, THE_SOURCE = 9, THE_ARTEFACT = 10

export const placeRule = place => {
  switch (place) {
    case THE_LAIR:
      return Lair
    case THE_JUNGLE:
      return Jungle
    case THE_RIVER:
      return River
    case THE_BEACH:
      return Beach
    case THE_ROVER:
      return Rover
    case THE_SWAMP:
      return Swamp
    case THE_SHELTER:
      return Shelter
    case THE_WRECK:
      return Wreck
    case THE_SOURCE:
      return Source
    case THE_ARTEFACT:
      return Artefact
  }
}
