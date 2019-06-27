import React from "react"
import {useDrag} from "react-dnd"

const CardInHand = ({children, classes = [], useDragItem, onClick}) => {
  classes.push('card-wrapper-outer')
  const style = {}
  let ref

  if (useDragItem) {
    const [{isDragging, dragOffsetDiff}, drag] = useDrag({
      item: useDragItem,
      collect: monitor => ({
        dragOffsetDiff: monitor.getDifferenceFromInitialOffset(),
        isDragging: monitor.isDragging()
      })
    })
    ref = drag

    if (isDragging) {
      classes.push('hover')
      style.left = dragOffsetDiff.x + 'px'
      style.top = dragOffsetDiff.y + 'px'
    }
  }

  return (
    <div className={classes.join(' ')} onClick={onClick} onTouchEnd={event => useDragItem && event.preventDefault()} ref={ref}>
      <div className="card-wrapper-inner" style={style}>
        {children}
      </div>
    </div>
  )
}

export default CardInHand