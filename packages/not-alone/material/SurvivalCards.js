import {Adrenaline} from "./survival-cards/Adrenaline";
import {Ingenuity} from "./survival-cards/Ingenuity";
import {Sacrifice} from "./survival-cards/Sacrifice";
import {SixthSense} from "./survival-cards/SixthSense";
import {Smokescreen} from "./survival-cards/Smokescreen";
import {StrikeBack} from "./survival-cards/StrikeBack";
import {Vortex} from "./survival-cards/Vortex";
import {Detector} from "./survival-cards/Detector";
import {Dodge} from "./survival-cards/Dodge";
import {Drone} from "./survival-cards/Drone";
import {Gate} from "./survival-cards/Gate";
import {Hologram} from "./survival-cards/Hologram";
import {WrongTrack} from "./survival-cards/WrongTrack";
import {Amplifier} from "./survival-cards/Amplifier";
import {DoubleBack} from "./survival-cards/DoubleBack";

export const
  ADRENALINE = 'Adrenaline',
  INGENUITY = 'Ingenuity',
  SACRIFICE = 'Sacrifice',
  SIXTH_SENSE = 'Sixth Sense',
  SMOKESCREEN = 'Smokescreen',
  STRIKE_BACK = 'Strike Back',
  VORTEX = 'Vortex',
  DETECTOR= 'Detector',
  DODGE = 'Dodge',
  DRONE = 'Drone',
  GATE = 'Gate',
  HOLOGRAM = 'Hologram',
  WRONG_TRACK = 'Wrong Track',
  AMPLIFIER = 'Amplifier',
  DOUBLE_BACK = 'Double Back'

export default [ADRENALINE, INGENUITY, SACRIFICE, SIXTH_SENSE, SMOKESCREEN, STRIKE_BACK, VORTEX, DETECTOR, DODGE, DRONE, GATE, HOLOGRAM, WRONG_TRACK, AMPLIFIER, DOUBLE_BACK]

export const survivalCardFromName = {
  [ADRENALINE]: Adrenaline,
  [INGENUITY]: Ingenuity,
  [SACRIFICE]: Sacrifice,
  [SIXTH_SENSE]: SixthSense,
  [SMOKESCREEN]: Smokescreen,
  [STRIKE_BACK]: StrikeBack,
  [VORTEX]: Vortex,
  [DETECTOR]: Detector,
  [DODGE]: Dodge,
  [DRONE]: Drone,
  [GATE]: Gate,
  [HOLOGRAM]: Hologram,
  [WRONG_TRACK]: WrongTrack,
  [AMPLIFIER]: Amplifier,
  [DOUBLE_BACK]: DoubleBack,
}