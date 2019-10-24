import React from 'react'
import './place-card.scss'
import {useTranslation} from 'react-i18next'
import {
  THE_ARTEFACT,
  THE_BEACH,
  THE_JUNGLE,
  THE_LAIR,
  THE_RIVER,
  THE_ROVER,
  THE_SHELTER,
  THE_SOURCE,
  THE_SWAMP,
  THE_WRECK
} from '@bga/not-alone/material/PlaceCards'

export const PLACE_CARD = 'Place card'

export default function PlaceCard({place}) {
  const classes = ['card', 'place-card']

  if (!isNaN(place)) {
    classes.push('place-' + place)
  }

  const {t} = useTranslation()

  return (
    <div className={classes.join(' ')} onTouchEnd={event => event.preventDefault()}>
      {!isNaN(place) && (
        <div className="face front">
          <h3 key="name">{placeTexts[place].name(t)}</h3>
          <div className="description" key="description">
            {placeTexts[place].description(t).map((description, index) => <p key={index}>{description}</p>)}
          </div>
        </div>)
      }
      <div className="face back"/>
    </div>
  )
}

export const placeTexts = {
  [THE_LAIR]: {
    name: t => t('The Lair'),
    description: t => [
      t('Take back to your hand the Place cards from your discard pile OR copy the power of the place with the Creature token.'),
      t('Lose 1 extra Will if caught by the Creature token.')
    ]
  },
  [THE_JUNGLE]: {
    name: t => t('The Jungle'),
    description: t => [t('Take back to your hand this Place card and 1 Place card from your discard pile.')]
  },
  [THE_RIVER]: {
    name: t => t('The River'),
    description: t => [t('Next turn, play 2 Place cards. Before revealing, choose one and return the second to your hand.')]
  },
  [THE_BEACH]: {
    name: t => t('The Beach'),
    description: t => [
      t('Place the Marker counter on the Beach OR remove it to move the Rescue counter forward 1 space.'),
      t('(max 1x/turn)')
    ]
  },
  [THE_ROVER]: {
    name: t => t('The Rover'),
    description: t => [t('Take from the reserve 1 Place card you do not own and add it to your hand.')]
  },
  [THE_SWAMP]: {
    name: t => t('The Swamp'),
    description: t => [t('Take back to your hand this Place card and 2 Place cards from your discard pile.')]
  },
  [THE_SHELTER]: {
    name: t => t('The Shelter'),
    description: t => [t('Draw 2 Survival cards, choose one and discard the second.')]
  },
  [THE_WRECK]: {
    name: t => t('The Wreck'),
    description: t => [
      t('Move the Rescue counter forward 1 space.'),
      t('(max 1x/turn)')
    ]
  },
  [THE_SOURCE]: {
    name: t => t('The Source'),
    description: t => [t('The Hunted of your choice (you or another player) regains 1 Will OR you draw 1 Survival card.')]
  },
  [THE_ARTEFACT]: {
    name: t => t('The Artefact'),
    description: t => [
      t('Next turn, play 2 Place cards. Resolve both places.'),
      t('You may not copy the Artefact.')
    ]
  }
}