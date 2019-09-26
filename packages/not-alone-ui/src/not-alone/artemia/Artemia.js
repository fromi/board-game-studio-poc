import React from 'react'
import {PLACE_CARD, places} from '../material/place-cards/PlaceCard'
import './artemia.scss'
import {useDrop} from 'react-dnd'
import {useTranslation} from 'react-i18next'
import ArtemiaPlace from './ArtemiaPlace'
import {PLACES} from '@bga/not-alone'

const Artemia = (props) => {
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
  return <div className="artemia" ref={drop}>
    <h3>Artemia</h3>
    {PLACES.map(place => <ArtemiaPlace place={place} key={place} {...props}/>)}
    {draggedPlace && <div className={dropInfoClasses.join(' ')}><p>{t('Play {place}', {place: t(places[draggedPlace].name)})}</p></div>}
  </div>
}

export default Artemia