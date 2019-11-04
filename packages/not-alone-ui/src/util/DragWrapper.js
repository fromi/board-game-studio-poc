import React, {useEffect} from 'react'
import {useDrag, useDragLayer} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'

export default function DragWrapper({children, draggable, item, className, ...props}) {
  let [{isDragging}, drag, preview] = useDrag({
    item: (typeof item) === 'string' ? {type: item} : item,
    canDrag: draggable,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => monitor.didDrop()
  })

  const {dragOffsetDiff} = useDragLayer(monitor => ({
    dragOffsetDiff: monitor.getDifferenceFromInitialOffset()
  }))

  useEffect(() => {
    preview(getEmptyImage())
  }, [])

  const classes = ['drag-wrapper']
  if (draggable) {
    classes.push('draggable')
  }
  if (isDragging && dragOffsetDiff) {
    classes.push('dragging')
  }
  const style = isDragging && dragOffsetDiff ? {transform: `translate(${dragOffsetDiff.x}px, ${dragOffsetDiff.y}px)`} : {}

  return (
    <div ref={drag} className={className + ' ' + classes.join(' ')} style={style} {...props}>
      {children}
    </div>
  )
}