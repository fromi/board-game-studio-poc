import React from "react"
import "./hunt-cards-deck.css"
import HuntCard from "./HuntCard"

const HuntCardsDeck = ({game}) => (
  <div className="hunt-cards-deck">
    {game.huntCardsDeck.slice(0, 5).map((card, index) => (
      <HuntCard key={index}/>
    ))}
  </div>
)

export default HuntCardsDeck