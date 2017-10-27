import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import promise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import reducers from './reducers/index'
import {AUTH_USER, READ_USER} from "./actions/types"
import App from './components/App'
import Welcome from './components/Welcome'
import PrivateRoute from './components/PrivateRoute'
import AuthRoute from './components/AuthRoute'
import registerServiceWorker from './registerServiceWorker'

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')

if (token && userId) {
  store.dispatch({ type: AUTH_USER})
  store.dispatch({
    type: READ_USER,
    payload: {id: userId}
  })
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <PrivateRoute path="/" component={App} />
        <AuthRoute path="/" component={Welcome} />
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker();
