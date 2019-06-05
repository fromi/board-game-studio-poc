import React from 'react'
import {render} from 'react-dom'
import Studio from './studio/Studio'
import * as Game from "./not-alone/NotAlone"
import * as GameUI from "./not-alone/NotAloneUI"
import './index.css'

render(<Studio Game={Game} GameUI={GameUI}/>, document.getElementById('studio'))