import React from 'react'
import PlaceCard, {places} from '../material/place-cards/PlaceCard'
import {Tooltip} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import {HUNT_TOKEN} from '../material/hunt-tokens/HuntToken'
import {useDrop} from 'react-dnd'
import {placeHuntToken} from '@bga/not-alone/moves/PlaceHuntToken'
import './artemia-place-card.scss'
import {getLegalMoves} from '@bga/not-alone'
import {USE_PLACE_POWER, usePlacePower} from '@bga/not-alone/moves/UsePlacePower'

const ArtemiaPlaceCard = ({game, place, play, playerId}) => {
  const {t} = useTranslation()
  const classes = ['artemia-place-card']

  const canUsePlacePower = getLegalMoves(game, playerId).some(move => move.type === USE_PLACE_POWER && move.place === place)
  if (canUsePlacePower) {
    classes.push('activable')
  }

  const handleClick = () => {
    if (canUsePlacePower) {
      play(usePlacePower(place, playerId))
    }
  }

  const [{isOver, canDrop}, drop] = useDrop({
    accept: [HUNT_TOKEN],
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: item => {
      play(placeHuntToken(item.token, [place]))
    }
  })

  if (isOver && canDrop) {
    classes.push('drop-available')
  }

  return (
    <Tooltip title={(
      <React.Fragment>
        <h3 key="name">{t(places[place].name)}</h3>
        {places[place].description.map((description, index) => <p key={index}>{t(description)}</p>)}
      </React.Fragment>
    )} enterTouchDelay={0}>
      <div ref={drop} className={classes.join(' ')} onClick={handleClick}>
        <PlaceCard place={place}/>
      </div>
    </Tooltip>
  )
}

export default ArtemiaPlaceCard