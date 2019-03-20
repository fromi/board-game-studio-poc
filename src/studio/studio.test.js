import React from 'react'
import ReactDOM from 'react-dom'
import Studio from './StudioTools'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Studio/>, div)
  ReactDOM.unmountComponentAtNode(div)
})
