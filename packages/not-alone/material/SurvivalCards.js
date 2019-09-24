import {Adrenaline} from "./survival-cards/Adrenaline"
import {Ingenuity} from "./survival-cards/Ingenuity"
import {Sacrifice} from "./survival-cards/Sacrifice"
import {SixthSense} from "./survival-cards/SixthSense"
import {Smokescreen} from "./survival-cards/Smokescreen"
import {StrikeBack} from "./survival-cards/StrikeBack"
import {Vortex} from "./survival-cards/Vortex"
import {Detector} from "./survival-cards/Detector"
import {Dodge} from "./survival-cards/Dodge"
import {Drone} from "./survival-cards/Drone"
import {Gate} from "./survival-cards/Gate"
import {Hologram} from "./survival-cards/Hologram"
import {WrongTrack} from "./survival-cards/WrongTrack"
import {Amplifier} from "./survival-cards/Amplifier"
import {DoubleBack} from "./survival-cards/DoubleBack"

export const
  ADRENALINE = 'Adrenaline',
  INGENUITY = 'Ingenuity',
  SACRIFICE = 'Sacrifice',
  SIXTH_SENSE = 'Sixth Sense',
  SMOKESCREEN = 'Smokescreen',
  STRIKE_BACK = 'Strike Back',
  VORTEX = 'Vortex',
  DETECTOR = 'Detector',
  DODGE = 'Dodge',
  DRONE = 'Drone',
  GATE = 'Gate',
  HOLOGRAM = 'Hologram',
  WRONG_TRACK = 'Wrong Track',
  AMPLIFIER = 'Amplifier',
  DOUBLE_BACK = 'Double Back'

export default [ADRENALINE, INGENUITY, SACRIFICE, SIXTH_SENSE, SMOKESCREEN, STRIKE_BACK, VORTEX, DETECTOR, DODGE, DRONE, GATE, HOLOGRAM, WRONG_TRACK, AMPLIFIER, DOUBLE_BACK]

export const survivalCardRule = card => {
  switch (card) {
    case ADRENALINE:
      return Adrenaline
    case INGENUITY:
      return Ingenuity
    case SACRIFICE:
      return Sacrifice
    case SIXTH_SENSE:
      return SixthSense
    case SMOKESCREEN:
      return Smokescreen
    case STRIKE_BACK:
      return StrikeBack
    case VORTEX:
      return Vortex
    case DETECTOR:
      return Detector
    case DODGE:
      return Dodge
    case DRONE:
      return Drone
    case GATE:
      return Gate
    case HOLOGRAM:
      return Hologram
    case WRONG_TRACK:
      return WrongTrack
    case AMPLIFIER:
      return Amplifier
    case DOUBLE_BACK:
      return DoubleBack
  }
}