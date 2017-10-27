import { SELECTED_PACK } from "../actions/types"

export default function(state = '', action) {
  switch (action.type) {
    case SELECTED_PACK:
      return action.payload
    default:
      return state
  }
}