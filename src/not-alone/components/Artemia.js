import React from "react"
import PlaceCard from "./PlaceCard"
import "./artemia.css"

const Artemia = ({game}) => (
  <div className={`artemia ${!game.boardSide ? 'creation' : ''}`}>
    {[...Array(10).keys()].map(i =>
      <PlaceCard place={i + 1}/>
    )}
  </div>
)

export default Artemia