import React from "react"
import survivalCard from '../img/survival-card.jpg'
import survivalCardBack from "../img/survival-card-back.jpg"
import {Trans} from "react-i18next"
import './survival-card.css'
import {
  ADRENALINE, AMPLIFIER,
  DETECTOR,
  DODGE, DOUBLE_BACK,
  DRONE,
  GATE,
  HOLOGRAM,
  INGENUITY,
  SACRIFICE,
  SIXTH_SENSE,
  SMOKESCREEN,
  STRIKE_BACK,
  VORTEX, WRONG_TRACK
} from "../material/SurvivalCards"

const SurvivalCard = ({cardName, state = ''}) => (
  <div className={`card survival-card ${state}`}>
    {cardName && <img className="face front" src={survivalCard} alt="" draggable="false"/>}
    <img className="face back" src={survivalCardBack} alt="" draggable="false"/>
    <h3><Trans>{cardName}</Trans></h3>
    <div className="description">
      <p><Trans>{descriptions[cardName]}</Trans></p>
    </div>
  </div>
)

const descriptions = {
  [ADRENALINE]: 'Regain 1 Will.',
  [INGENUITY]: 'Place the Marker counter on the Beach.',
  [SACRIFICE]: 'Discard 1 Place card. No Hunt card may be played this turn.',
  [SIXTH_SENSE]: 'Take back to your hand 2 Place cards from your discard pile.',
  [SMOKESCREEN]: 'All the Hunted hide their discarded Place cards until the end of the turn.',
  [STRIKE_BACK]: 'Take 2 random Hunt cards from the Creature’s hand and put them at the bottom of the Hunt deck.',
  [VORTEX]: 'Swap your played Place card for one Place card from your discard pile.',
  [DETECTOR]: 'Avoid the effects of the Artemia token.',
  [DODGE]: 'Avoid the effects of the Creature token.',
  [DRONE]: 'Instead of using the power of your Place card, copy the power of the Rover.',
  [GATE]: 'Instead of using the power of your Place card, copy the power of an adjacent place.',
  [HOLOGRAM]: 'Move the Artemia token to an adjacent place.',
  [WRONG_TRACK]: 'Move the Creature token to an adjacent place.',
  [AMPLIFIER]: 'Remove the Marker counter from the Beach to immediately move the Rescue counter forward 1 space.',
  [DOUBLE_BACK]: 'Take back the Place card you just played.'
}

export default SurvivalCard