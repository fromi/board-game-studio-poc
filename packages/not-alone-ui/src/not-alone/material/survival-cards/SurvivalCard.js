import React from 'react'
import {useTranslation} from 'react-i18next'
import './survival-card.scss'
import {
  ADRENALINE,
  AMPLIFIER,
  DETECTOR,
  DODGE,
  DOUBLE_BACK,
  DRONE,
  GATE,
  HOLOGRAM,
  INGENUITY,
  SACRIFICE,
  SIXTH_SENSE,
  SMOKESCREEN,
  STRIKE_BACK,
  survivalCardRule,
  VORTEX,
  WRONG_TRACK
} from '@bga/not-alone/material/SurvivalCards'

export default function SurvivalCard({card, classes = []}) {
  const {t} = useTranslation()
  classes.push('card', 'survival-card')
  return (
    <div className={classes.join(' ')}>
      {card && (
        <div className="face front">
          <h3 key="name">{survivalCardTexts[card].name(t)}</h3>
          <div className="description" key="description">
            <p>{survivalCardTexts[card].description(t)}</p>
          </div>
          <p className="phase">{t('Phase {number}', {number: survivalCardRule(card).phase})}</p>
        </div>
      )}
      <div className="face back"/>
    </div>
  )
}

export const survivalCardTexts = {
  [ADRENALINE]: {
    name: t => t('Adrenaline'),
    description: t => t('Regain 1 Will.')
  },
  [INGENUITY]: {
    name: t => t('Ingenuity'),
    description: t => t('Place the Marker counter on the Beach.')
  },
  [SACRIFICE]: {
    name: t => t('Sacrifice'),
    description: t => t('Discard 1 Place card. No Hunt card may be played this turn.')
  },
  [SIXTH_SENSE]: {
    name: t => t('Sixth Sense'),
    description: t => t('Take back to your hand 2 Place cards from your discard pile.')
  },
  [SMOKESCREEN]: {
    name: t => t('Smokescreen'),
    description: t => t('All the Hunted hide their discarded Place cards until the end of the turn.')
  },
  [STRIKE_BACK]: {
    name: t => t('Strike Back'),
    description: t => t('Take 2 random Hunt cards from the Creature’s hand and put them at the bottom of the Hunt deck.')
  },
  [VORTEX]: {
    name: t => t('Vortex'),
    description: t => t('Swap your played Place card for one Place card from your discard pile.')
  },
  [DETECTOR]: {
    name: t => t('Detector'),
    description: t => t('Avoid the effects of the Artemia token.')
  },
  [DODGE]: {
    name: t => t('Dodge'),
    description: t => t('Avoid the effects of the Creature token.')
  },
  [DRONE]: {
    name: t => t('Drone'),
    description: t => t('Instead of using the power of your Place card, copy the power of the Rover.')
  },
  [GATE]: {
    name: t => t('Gate'),
    description: t => t('Instead of using the power of your Place card, copy the power of an adjacent place.')
  },
  [HOLOGRAM]: {
    name: t => t('Hologram'),
    description: t => t('Move the Artemia token to an adjacent place.')
  },
  [WRONG_TRACK]: {
    name: t => t('Wrong Track'),
    description: t => t('Move the Creature token to an adjacent place.')
  },
  [AMPLIFIER]: {
    name: t => t('Amplifier'),
    description: t => t('Remove the Marker counter from the Beach to immediately move the Rescue counter forward 1 space.')
  },
  [DOUBLE_BACK]: {
    name: t => t('Double Back'),
    description: t => t('Take back the Place card you just played.')
  }
}