import React from "react"
import {useDrag} from "react-dnd"

const CardInHand = ({children, classes = [], useDragItem, onSelect}) => {
  classes = [...classes, 'card-wrapper-outer']
  let x = 0, y = 0
  let ref

  if (useDragItem) {
    const [{isDragging, dragOffsetDiff}, drag] = useDrag({
      item: useDragItem,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        dragOffsetDiff: monitor.getDifferenceFromInitialOffset()
      }),
      end: (item, monitor) => monitor.didDrop() && onSelect()
    })
    ref = drag

    if (isDragging) {
      classes.push('hover', 'dragging')
      if (dragOffsetDiff) {
        x = dragOffsetDiff.x
        y = dragOffsetDiff.y
      }
    }
  }

  return (
    <div className={classes.join(' ')} onClick={onSelect} onTouchEnd={event => useDragItem && event.preventDefault()} ref={ref}>
      <CardWrapperInner x={x} y={y} children={children}/>
    </div>
  )
}

const CardWrapperInner = React.memo(({x, y, children}) => (
  <div className="card-wrapper-inner" style={{left: x + 'px', top: y + 'px'}}>
    {children}
  </div>
))

export default CardInHand