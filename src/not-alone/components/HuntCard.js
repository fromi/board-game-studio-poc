import React from "react"
import huntCard from '../img/hunt-card.jpg'

const HuntCard = ({cardName}) => (
  <div className="card hunt-card">
    <img src={huntCard} alt="" draggable="false"/>
  </div>
)

export default HuntCard