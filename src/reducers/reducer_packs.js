import {CREATE_PACK, READ_PACKS, READ_PACK} from '../actions/types'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_PACK:
      return {...state, [action.payload.id]: action.payload }
    case READ_PACKS:
      return _.mapKeys(action.payload, "id")
    case READ_PACK:
      return {...state, [action.payload.id]: action.payload }
    default:
      return state
  }
}