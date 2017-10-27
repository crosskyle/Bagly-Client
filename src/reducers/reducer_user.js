import { READ_USER } from "../actions/types"

export default function(state = {}, action) {
  switch (action.type) {
    case READ_USER:
      return {...state, [action.payload.id]: action.payload }
    default:
      return state
  }
}
