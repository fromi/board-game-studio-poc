import React from "react"
import PlaceCard from "./PlaceCard"
import "./artemia.css"

const Artemia = () => (
  <div className="artemia">
    {[...Array(10).keys()].map(i =>
      <PlaceCard place={i + 1} key={i + 1}/>
    )}
  </div>
)

export default Artemia