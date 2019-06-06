import React from "react"
import './place-card.css'

const images = require.context('../img/places');
const getImage = (place) => images('./place_' + place + '.jpg')

const PlaceCard = ({place}) => (
  <div className={`card place-card place${place}`}>
    <img src={getImage(place)} alt={'Place ' + place} draggable="false"/>
  </div>
)

export default PlaceCard