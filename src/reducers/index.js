import { combineReducers } from 'redux'
import PacksReducer from './reducer_packs'
import ItemsReducer from './reducer_items'
import SelectedPackReducer from './reducer_selected_pack'
import PackVisReducer from './reducer_pack_vis'
import AuthReducer from './reducer_auth'
import UserReducer from './reducer_user'

const rootReducer = combineReducers({
  user: UserReducer,
  packs: PacksReducer,
  items: ItemsReducer,
  selectedPack: SelectedPackReducer,
  packVisData: PackVisReducer,
  auth: AuthReducer
})

export default rootReducer