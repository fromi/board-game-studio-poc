import React from "react"
import huntCard from '../img/hunt-card.jpg'
import huntCardBack from "../img/hunt-card-back.jpg"

const HuntCard = ({cardName, state}) => (
  <div className={`card hunt-card ${state}`}>
    {cardName && <img className="face front" src={huntCard} alt="" draggable="false"/>}
    <img className="face back" src={huntCardBack} alt="" draggable="false"/>
  </div>
)

export default HuntCard