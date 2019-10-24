import React, {useEffect} from 'react'
import './hand.scss'
import {useDrag, useDragLayer} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'

export default function HandItem({children, className = '', hovering, drag, ...props}) {
  let draggable = drag ? drag.enable : false, dragging, ref, preview, child = children

  if (drag) {
    [{dragging}, ref, preview] = useDrag({
      item: drag.item,
      canDrag: drag.enable,
      collect: monitor => ({
        dragging: monitor.isDragging()
      })
    })

    child = (
      <HandItemDrag dragging={dragging}>
        {children}
      </HandItemDrag>
    )

    useEffect(() => {
      preview(getEmptyImage())
    }, [])
  }

  return (
    <div ref={ref} className={`${className} ${hovering ? 'hovering' : ''} ${draggable ? 'draggable' : ''} ${dragging ? 'dragging' : ''}`.trim()} {...props}>
      <div className="hand-item-position">
        {child}
      </div>
    </div>
  )
}

const HandItemDrag = React.memo(({children, dragging}) => {

  const {dragOffsetDiff} = dragging ? useDragLayer(monitor => ({
    dragOffsetDiff: monitor.getDifferenceFromInitialOffset()
  })) : {}

  const style = dragging && dragOffsetDiff ? {transform: `translate(${dragOffsetDiff.x}px, ${dragOffsetDiff.y}px)`, transition: 'none'} : {}

  return (
    <div className="hand-item-drag" style={style}>
      {children}
    </div>
  )
})