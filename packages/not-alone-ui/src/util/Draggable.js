import React, {useEffect} from "react";
import {useDrag, useDragLayer} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

const Draggable = ({children, draggable, item}) => {
  if (!draggable) {
    return (
      <div>
        {children}
      </div>
    )
  }

  let [{isDragging}, drag, preview] = useDrag({
    item,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const {dragOffsetDiff} = useDragLayer(monitor => ({
    dragOffsetDiff: monitor.getDifferenceFromInitialOffset() || {x: 0, y: 0}
  }))

  useEffect(() => {
    preview(getEmptyImage())
  }, [])

  const classes = ['draggable']
  if (isDragging) {
    classes.push('dragging')
  }

  return (
    <div ref={drag} className={classes.join(' ')} style={{transform: `translate(${dragOffsetDiff.x}px, ${dragOffsetDiff.y}px)`}}>
      {children}
    </div>
  )
}

export default Draggable