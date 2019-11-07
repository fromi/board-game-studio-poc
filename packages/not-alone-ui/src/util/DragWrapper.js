import React, {useEffect} from 'react'
import {useDrag, useDragLayer} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'

export default function DragWrapper({children, draggable, item, className = '', ...props}) {
  let [{dragging}, drag, preview] = useDrag({
    item: (typeof item) === 'string' ? {type: item} : item,
    canDrag: draggable,
    collect: monitor => ({
      dragging: monitor.isDragging()
    }),
    end: (item, monitor) => monitor.didDrop()
  })

  const {dragOffsetDiff} = useDragLayer(monitor => ({
    dragOffsetDiff: monitor.getDifferenceFromInitialOffset()
  }))

  useEffect(() => {
    preview(getEmptyImage())
  }, [])

  const style = dragging && dragOffsetDiff ? {transform: `translate(${dragOffsetDiff.x}px, ${dragOffsetDiff.y}px)`} : {}

  return (
    <div ref={drag} className={`${className} ${draggable ? 'draggable' : ''} ${dragging && dragOffsetDiff ? 'dragging' : ''}`.trim()} {...props}>
      <div className="drag-wrapper" style={style}>
        {children}
      </div>
    </div>
  )
}