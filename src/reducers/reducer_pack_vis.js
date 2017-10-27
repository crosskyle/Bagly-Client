import { PACK_VIS } from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case PACK_VIS:
      return action.payload
    default:
      return state
  }
}