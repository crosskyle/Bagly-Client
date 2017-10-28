import { SELECTED_PACK } from "../actions/types"

export default function(state = '', action) {
  switch (action.type) {
    case SELECTED_PACK:
      return action.payload
    default:
      return '59f40657dd0da50012963c12'
  }
}