import React from "react"
import PlaceCard, {PLACE_CARD, places} from "./PlaceCard"
import "./artemia.scss"
import {useDrop} from "react-dnd"
import {useTranslation} from "react-i18next"

const Artemia = () => {
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
      {[...Array(10).keys()].map(i =>
        <PlaceCard place={i + 1} key={i + 1}/>
      )}
      {draggedPlace && <div className={dropInfoClasses.join(' ')}><p>{t('Play {{place}}', {place: t(places[draggedPlace].name)})}</p></div>}
    </div>
  )
}

export default Artemia