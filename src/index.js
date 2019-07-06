import React from 'react'
import {render} from 'react-dom'
import {createStudio} from './studio/Studio'
import * as Game from "./not-alone/NotAlone"
import * as GameUI from "./not-alone/NotAloneUI"
import './index.css'

const Studio = createStudio(Game, GameUI)

render(<Studio/>, document.getElementById('studio'))