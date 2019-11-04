import React from 'react'
import PlaceCard from '../material/place-cards/PlaceCard'
import {Popover} from '@material-ui/core'
import {HUNT_TOKEN} from '../material/hunt-tokens/HuntToken'
import {useDrop} from 'react-dnd'
import {placeHuntToken} from '@bga/not-alone/moves/PlaceHuntToken'
import './artemia-place-card.scss'
import {getLegalMoves} from '@bga/not-alone'
import {USE_PLACE_POWER, usePlacePower} from '@bga/not-alone/moves/UsePlacePower'
import {COPY_PLACE_POWER, copyPlacePower} from '@bga/not-alone/moves/CopyPlacePower'
import {TAKE_PLACE_FROM_RESERVE, takePlaceFromReserve} from '@bga/not-alone/moves/TakePlaceFromReserve'

export default function ArtemiaPlaceCard({game, place, play, undo, playerId}) {
  const classes = ['artemia-place-card']
  const [isOpen, setOpen] = React.useState(false)

  const canUsePlacePower = getLegalMoves(game, playerId).some(move => move.type === USE_PLACE_POWER && move.place === place)
  const canCopyPlacePower = getLegalMoves(game, playerId).some(move => move.type === COPY_PLACE_POWER && move.place === place)
  const canTakePlace = getLegalMoves(game, playerId).some(move => move.type === TAKE_PLACE_FROM_RESERVE && move.place === place)
  if (canUsePlacePower || canCopyPlacePower || canTakePlace) {
    classes.push('activable')
  }

  const handleClick = () => {
    if (canUsePlacePower) {
      play(usePlacePower(place, playerId))
    } else if (canCopyPlacePower) {
      play(copyPlacePower(place, playerId))
    } else if (canTakePlace) {
      play(takePlaceFromReserve(place, playerId))
    } else {
      setOpen(true)
    }
  }

  const [{isOver, canDrop}, drop] = useDrop({
    accept: [HUNT_TOKEN],
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop() && !game.huntTokensLocations[monitor.getItem().token].includes(place)
    }),
    drop: item => {
      if (game.huntTokensLocations[item.token].length !== 0) {
        undo(placeHuntToken(item.token, game.huntTokensLocations[item.token]))
      }
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