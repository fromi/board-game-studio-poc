import React from 'react'
import {PLACE_CARD, placeTexts} from '../material/place-cards/PlaceCard'
import './artemia.scss'
import {useDrop} from 'react-dnd'
import {useTranslation} from 'react-i18next'
import ArtemiaPlace from './ArtemiaPlace'
import {PLACES} from '@bga/not-alone'
import {PLAY_PLACE_CARD} from '@bga/not-alone/moves/PlayPlaceCard'

export default function Artemia(props) {
  const {t} = useTranslation()
  const {playerId, play} = props
  const [{draggedPlace, isOver}, drop] = useDrop({
    accept: PLACE_CARD,
    collect: (monitor) => ({
      draggedPlace: monitor.getItem() ? monitor.getItem().place : undefined,
      isOver: monitor.isOver()
    }),
    drop: item => play({type: PLAY_PLACE_CARD, place: item.place, huntedId: playerId})
  })
  const dropInfoClasses = ['drop-info']
  if (isOver) {
    dropInfoClasses.push('item-over')
  }
  return <div className="artemia" ref={drop}>
    <h3>Artemia</h3>
    {PLACES.map(place => <ArtemiaPlace place={place} key={place} {...props}/>)}
    {draggedPlace && <div className={dropInfoClasses.join(' ')}><p>{t('Play {place}', {place: placeTexts[draggedPlace].name(t)})}</p></div>}
  </div>
}