import React from 'react'
import PlaceCard from '../material/place-cards/PlaceCard'
import {Popover} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import {HUNT_TOKEN} from '../material/hunt-tokens/HuntToken'
import {useDrop} from 'react-dnd'
import {placeHuntToken} from '@bga/not-alone/moves/PlaceHuntToken'
import './artemia-place-card.scss'
import {getLegalMoves} from '@bga/not-alone'
import {USE_PLACE_POWER, usePlacePower} from '@bga/not-alone/moves/UsePlacePower'

const ArtemiaPlaceCard = ({game, place, play, playerId}) => {
  const classes = ['artemia-place-card']
  const [isOpen, setOpen] = React.useState(false)

  const canUsePlacePower = getLegalMoves(game, playerId).some(move => move.type === USE_PLACE_POWER && move.place === place)
  if (canUsePlacePower) {
    classes.push('activable')
  }

  const handleClick = () => {
    if (canUsePlacePower) {
      play(usePlacePower(place, playerId))
    } else {
      setOpen(true)
    }
  }

  const [{isOver, canDrop}, drop] = useDrop({
    accept: [HUNT_TOKEN],
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: item => {
      play(placeHuntToken(item.token, [place]))
    }
  })

  if (isOver && canDrop) {
    classes.push('drop-available')
  }

  return (
    <React.Fragment>
      <div ref={drop} className={classes.join(' ')} onClick={handleClick}>
        <PlaceCard place={place}/>
      </div>
      <Popover className="card-big" open={isOpen} onClose={() => setOpen(false)}>
        <PlaceCard place={place}/>
      </Popover>
    </React.Fragment>
  )
}

export default ArtemiaPlaceCard