import React from "react"
import huntCardBack from "../img/hunt-card-back.jpg"
import "./hunt-cards-deck.css"

const HuntCardsDeck = ({game}) => (
  <div className={`hunt-cards-deck ${!game.boardSide ? 'creation' : ''}`}>
    {game.huntCardsDeck.slice(0, 5).map((card, index) => (
      <div className="card" key={index}>
        <img src={huntCardBack} alt={'The deck of Hunt cards'} draggable="false"/>
      </div>
    ))}
  </div>
)

export default HuntCardsDeck