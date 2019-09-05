import {Despair} from "./hunt-cards/Despair";
import {ForceField} from "./hunt-cards/ForceField";
import {Anticipation} from "./hunt-cards/Anticipation";
import {Ascendancy} from "./hunt-cards/Ascendancy";
import {Fierceness} from "./hunt-cards/Fierceness";
import {ForbiddenZone} from "./hunt-cards/ForbiddenZone";
import {Interference} from "./hunt-cards/Interferences";
import {Persecution} from "./hunt-cards/Persecution";
import {Mutation} from "./hunt-cards/Mutation";
import {Phobia} from "./hunt-cards/Phobia";
import {Virus} from "./hunt-cards/Virus";
import {Clone} from "./hunt-cards/Clone";
import {Mirage} from "./hunt-cards/Mirage";
import {Scream} from "./hunt-cards/Scream";
import {Toxin} from "./hunt-cards/Toxin";
import {Cataclysm} from "./hunt-cards/Cataclysm";
import {Detour} from "./hunt-cards/Detour";
import {Stasis} from "./hunt-cards/Stasis";
import {Tracking} from "./hunt-cards/Tracking";
import {Flashback} from "./hunt-cards/Flashback";

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

export const huntCardFromName = {
  [DESPAIR]: Despair,
  [FORCE_FIELD]: ForceField,
  [ANTICIPATION]: Anticipation,
  [ASCENDANCY]: Ascendancy,
  [FIERCENESS]: Fierceness,
  [FORBIDDEN_ZONE]: ForbiddenZone,
  [INTERFERENCE]: Interference,
  [PERSECUTION]: Persecution,
  [MUTATION]: Mutation,
  [PHOBIA]: Phobia,
  [VIRUS]: Virus,
  [CLONE]: Clone,
  [MIRAGE]: Mirage,
  [SCREAM]: Scream,
  [TOXIN]: Toxin,
  [CATACLYSM]: Cataclysm,
  [DETOUR]: Detour,
  [STASIS]: Stasis,
  [TRACKING]: Tracking,
  [FLASHBACK]: Flashback
}