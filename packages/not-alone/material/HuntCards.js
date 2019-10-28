import {Despair} from './hunt-cards/Despair'
import {ForceField} from './hunt-cards/ForceField'
import {Anticipation} from './hunt-cards/Anticipation'
import {Ascendancy} from './hunt-cards/Ascendancy'
import {Fierceness} from './hunt-cards/Fierceness'
import {ForbiddenZone} from './hunt-cards/ForbiddenZone'
import {Interference} from './hunt-cards/Interferences'
import {Persecution} from './hunt-cards/Persecution'
import {Mutation} from './hunt-cards/Mutation'
import {Phobia} from './hunt-cards/Phobia'
import {Virus} from './hunt-cards/Virus'
import {Clone} from './hunt-cards/Clone'
import {Mirage} from './hunt-cards/Mirage'
import {Scream} from './hunt-cards/Scream'
import {Toxin} from './hunt-cards/Toxin'
import {Cataclysm} from './hunt-cards/Cataclysm'
import {Detour} from './hunt-cards/Detour'
import {Stasis} from './hunt-cards/Stasis'
import {Tracking} from './hunt-cards/Tracking'
import {Flashback} from './hunt-cards/Flashback'

export const
  DESPAIR = 'Despair',
  FORCE_FIELD = 'Force Field',
  ANTICIPATION = 'Anticipation',
  ASCENDANCY = 'Ascendancy',
  FIERCENESS = 'Fierceness',
  FORBIDDEN_ZONE = 'Forbidden Zone',
  INTERFERENCE = 'Interference',
  PERSECUTION = 'Persecution',
  MUTATION = 'Mutation',
  PHOBIA = 'Phobia',
  VIRUS = 'Virus',
  CLONE = 'Clone',
  MIRAGE = 'Mirage',
  SCREAM = 'Scream',
  TOXIN = 'Toxin',
  CATACLYSM = 'Cataclysm',
  DETOUR = 'Detour',
  STASIS = 'Stasis',
  TRACKING = 'Tracking',
  FLASHBACK = 'Flashback'

export default [DESPAIR, FORCE_FIELD, ANTICIPATION, ASCENDANCY, FIERCENESS, FORBIDDEN_ZONE, INTERFERENCE, PERSECUTION, MUTATION, PHOBIA, VIRUS, CLONE, MIRAGE,
  SCREAM, TOXIN, CATACLYSM, DETOUR, STASIS, TRACKING, FLASHBACK]

export const huntCardRule = card => {
  switch (card) {
    case DESPAIR:
      return Despair
    case FORCE_FIELD:
      return ForceField
    case ANTICIPATION:
      return Anticipation
    case ASCENDANCY:
      return Ascendancy
    case FIERCENESS:
      return Fierceness
    case FORBIDDEN_ZONE:
      return ForbiddenZone
    case INTERFERENCE:
      return Interference
    case PERSECUTION:
      return Persecution
    case MUTATION:
      return Mutation
    case PHOBIA:
      return Phobia
    case VIRUS:
      return Virus
    case CLONE:
      return Clone
    case MIRAGE:
      return Mirage
    case SCREAM:
      return Scream
    case TOXIN:
      return Toxin
    case CATACLYSM:
      return Cataclysm
    case DETOUR:
      return Detour
    case STASIS:
      return Stasis
    case TRACKING:
      return Tracking
    case FLASHBACK:
      return Flashback
  }
}

export function canHuntCardBePlayed(game, card) {
  const HuntCardRule = huntCardRule(card)
  return HuntCardRule && (HuntCardRule.canBePlayed && HuntCardRule.canBePlayed(game) || HuntCardRule.phase === game.phase)
}