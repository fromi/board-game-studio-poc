import React from "react"
import {PLACE_CARD, places} from "./PlaceCard"
import "./artemia.scss"
import {useDrop} from "react-dnd"
import {useTranslation} from "react-i18next"
import {Tooltip} from "@material-ui/core";
import ArtemiaPlace from "./ArtemiaPlace";
import {PLACE_HUNT_TOKEN} from "../moves/PlaceHuntToken";
import markerCounter from "../img/marker-counter.png"

const Artemia = ({game, play}) => {
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
      {[...Array(10).keys()].map(i => {
        const place = i + 1;
        const placeClasses = ['place', 'place-' + place]
        return (
          <div className={placeClasses.join(' ')} key={place}>
            <ArtemiaPlace place={place} dropHuntToken={token => play({type: PLACE_HUNT_TOKEN, token, locations: [place]})}/>
            {place === 4 && (
              <Tooltip title={t('Marker counter (for the Beach)')} enterTouchDelay={0}>
                <img className={game.markerCounterOnBeach ? 'marker-counter on-beach' : 'marker-counter'} src={markerCounter} alt={t('Marker counter (for the Beach)')}/>
              </Tooltip>
            )}
            {place > 5 && (
              <Tooltip title={t('{count, plural, one {One copy} other {{count} copies}} left in the reserve', {count: game.reserve[place]})} enterTouchDelay={0}>
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