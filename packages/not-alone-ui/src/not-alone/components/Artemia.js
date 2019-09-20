import React from "react"
import {PLACE_CARD, places} from "./PlaceCard"
import "./artemia.scss"
import {useDrop} from "react-dnd"
import {useTranslation} from "react-i18next"
import {Tooltip} from "@material-ui/core";
import ArtemiaPlace from "./ArtemiaPlace";
import MarkerCounter from "./MarkerCounter";
import {PLACES} from "@bga/not-alone";
import {THE_BEACH, THE_ROVER} from "@bga/not-alone/material/PlaceCards";

const Artemia = (props) => {
  const {game} = props
  const {t} = useTranslation()
  const [{draggedPlace, isOver}, drop] = useDrop({
    accept: PLACE_CARD,
    collect: (monitor) => ({
      draggedPlace: monitor.getItem() ? monitor.getItem().place : undefined,
      isOver: monitor.isOver()
    })
  })
  const dropInfoClasses = ['drop-info']
  if (isOver) {
    dropInfoClasses.push('item-over')
  }
  return (
    <div className="artemia" ref={drop}>
      <h3>Artemia</h3>
      {PLACES.map(place => {
        const placeClasses = ['place', 'place-' + place]
        return (
          <div className={placeClasses.join(' ')} key={place}>
            <ArtemiaPlace {...props} place={place}/>
            {place === THE_BEACH && <MarkerCounter {...props}/>}
            {place > THE_ROVER && (
              <Tooltip title={t('{count, plural, one {One copy} other {{count} copies}} left in the reserve', {count: game.reserve[place]})}
                       enterTouchDelay={0}>
                <div className="reserve">{game.reserve[place]}</div>
              </Tooltip>
            )}
          </div>
        )
      })}
      {draggedPlace && <div className={dropInfoClasses.join(' ')}><p>{t('Play {place}', {place: t(places[draggedPlace].name)})}</p></div>}
    </div>
  )
}

export default Artemia