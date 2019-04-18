import {SELECT_TAB} from "../StudioActions"

export function studio(state = {}, action) {
  switch (action.type) {
    case SELECT_TAB:
      return {...state, tab: action.tab}
    default:
      return state
  }
}