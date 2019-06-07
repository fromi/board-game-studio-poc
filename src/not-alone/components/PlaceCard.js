import React from "react"
import './place-card.css'

const images = require.context('../img/places');
const getImage = (place) => images('./place_' + place + '.jpg')

const PlaceCard = ({place}) => (
  <div className={`card place-card place${place}`}>
    <img src={getImage(place)} alt={'Place ' + place} draggable="false"/>
    <h3>{places[place].name}</h3>
    <div className="description">
      {places[place].description.map(description => <p>{description}</p>)}
    </div>
  </div>
)

const places = {
  1: {
    name: 'The Lair',
    description: ['Take back to your hand the Place cards from your discard pile OR copy the power of the place with the Creature token.',
      'Lose 1 extra Will if caught by the Creature token.']
  },
  2: {
    name: 'The Jungle',
    description: ['Take back to your hand this Place card and 1 Place card from your discard pile.']
  },
  3: {
    name: 'The River',
    description: ['Next turn, play 2 Place cards. Before revealing, choose one and return the second to your hand.']
  },
  4: {
    name: 'The Beach',
    description: ['Place the Marker counter on the Beach OR remove it to move the Rescue counter forward 1 space.',
      '(max 1x/turn)']
  },
  5: {
    name: 'The Rover',
    description: ['Take from the reserve 1 Place card you do not own and add it to your hand.']
  },
  6: {
    name: 'The Swamp',
    description: ['Take back to your hand this Place card and 2 Place cards from your discard pile.']
  },
  7: {
    name: 'The Shelter',
    description: ['Draw 2 Survival cards, choose one and discard the second.']
  },
  8: {
    name: 'The Wreck',
    description: ['Move the Rescue counter forward 1 space.',
      '(max 1x/turn)']
  },
  9: {
    name: 'The Source',
    description: ['The Hunted of your choice (you or another player) regains 1 Will OR you draw 1 Survival card.']
  },
  10: {
    name: 'The Artefact',
    description: ['Next turn, play 2 Place cards. Resolve both places. You may not copy the Artefact.']
  }
}

export default PlaceCard