import axios from 'axios'

import {
  READ_USER,
  DELETE_ITEM,
  CREATE_PACK,
  READ_PACK,
  READ_PACKS,
  SELECTED_PACK,
  READ_ITEMS,
  PACK_VIS,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types'

const ROOT_URL = 'https://floating-fjord-48312.herokuapp.com'


export function signoutUser() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')

  return {
    type: UNAUTH_USER,
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signupUser(email, password) {

  return function (dispatch) {

    axios.post(`${ROOT_URL}/api/signup`, { email: email, password: password })
      .then(response => {
        // save the JWT token
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.user.id)

        // update state to indicate user is auth'd
        dispatch({ type: AUTH_USER })
        dispatch({
          type: READ_USER,
          payload: response.data.user
        })
      })
      .catch(() => {
        // show error to the user
        dispatch(authError('Email is in use'))
      })
  }
}

export function signinUser(email, password) {

  return function (dispatch) {
    axios.post(`${ROOT_URL}/api/signin`, { email: email, password: password })
      .then(response => {
        // save the JWT token
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.user.id)

        // update state to indicate user is auth'd
        dispatch({ type: AUTH_USER })
        dispatch({
          type: READ_USER,
          payload: response.data.user
        })
      })
      .catch(() => {
        // show error to the user
        dispatch(authError('Bad Login Info'))
      })
  }
}


export function createPack() {
  const USER_ID = localStorage.getItem('userId')
  const response = axios.post(`${ROOT_URL}/api/users/${USER_ID}/packs`)
    .then((resp) => resp.data)

  return {
    type: CREATE_PACK,
    payload: response
  }
}


export function updatePack(packId, reqObj) {
  const USER_ID = localStorage.getItem('userId')
  const response = axios.put(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}`, reqObj)
    .then((resp) => resp.data)

  return {
    type: CREATE_PACK,
    payload: response
  }
}


export function createCategory(packId, reqObj) {
  const USER_ID = localStorage.getItem('userId')
  const response = axios.post(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}/categories`, {
    title: reqObj.title
  })
    .then((resp) => resp.data)

  return {
    type: READ_PACK,
    payload: response
  }
}


export function createItemInCategory(packId, categoryId, reqObj) {
  const USER_ID = localStorage.getItem('userId')
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}/categories/${categoryId}/items`, reqObj)
      .then((resp) => {
        dispatch({
          type: READ_PACK,
          payload: resp.data
        })
        return resp
      })
      .then((resp) => {
        let series = updatePackVis(resp.data)
        dispatch({
          type: PACK_VIS,
          payload: series
        })
      })
      .then(() => {
        axios.get(`${ROOT_URL}/api/users/${USER_ID}`, {
          headers: { authorization: localStorage.getItem('token') }
        })
          .then((resp) =>  {
            dispatch({
              type: READ_ITEMS,
              payload: resp.data.items
            })
          })
      })
  }
}

export function putItemInCategory(categoryEndpoint, itemId) {
  return function (dispatch) {
    axios.put(`${ROOT_URL}${categoryEndpoint}/items/${itemId}`)
      .then((resp) => {
        dispatch({
          type: READ_PACK,
          payload: resp.data
        })
        return resp.data
      })
      .then((pack) => {
        let series = updatePackVis(pack)
        dispatch({
          type: PACK_VIS,
          payload: series
        })
      })
  }
}


export function readPacks() {
  const USER_ID = localStorage.getItem('userId')
  const response = axios.get(`${ROOT_URL}/api/users/${USER_ID}/packs`, {
    headers: { authorization: localStorage.getItem('token') }
  })
    .then((resp) =>  resp.data )

  return {
    type: READ_PACKS,
    payload: response
  }
}


export function readItems() {
  const USER_ID = localStorage.getItem('userId')
  const response = axios.get(`${ROOT_URL}/api/users/${USER_ID}`, {
    headers: { authorization: localStorage.getItem('token') }
  })
    .then((resp) =>  resp.data.items )

  return {
    type: READ_ITEMS,
    payload: response
  }
}


export function selectedPack(packId) {
  return {
    type: SELECTED_PACK,
    payload: packId
  }
}


export function deletePack(packId) {
  const USER_ID = localStorage.getItem('userId')
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}`)
      .then((resp) => {
        dispatch({
          type: SELECTED_PACK,
          payload: ''
        })
        return resp
      })
      .then((resp) => {
        dispatch({
          type: READ_PACKS,
          payload: resp.data
        })
      })
      .then(() => {
        dispatch({
          type: PACK_VIS,
          payload: []
        })
      })
  }
}


export function deleteItem(itemId, pack) {
  const USER_ID = localStorage.getItem('userId')
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/api/users/${USER_ID}/items/${itemId}`)
      .then(() => {
        dispatch({
          type: DELETE_ITEM,
          payload: itemId
        })
      })
      .then(() => {
        axios.get(`${ROOT_URL}/api/users/${USER_ID}/packs`, {
          headers: { authorization: localStorage.getItem('token') }
        })
          .then((resp) => {
            dispatch({
              type: READ_PACKS,
              payload: resp.data
            })
            if (pack) {
              const updatedPack = resp.data.find(o => o.id === pack.id)
              const series = updatePackVis(updatedPack)
              dispatch({
                type: PACK_VIS,
                payload: series
              })
            }
          })
      })
  }
}

export function deleteCategory(packId, categoryId) {
  const USER_ID = localStorage.getItem('userId')
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}/categories/${categoryId}`)
      .then((resp) => {
        dispatch({
          type: READ_PACK,
          payload: resp.data
        })
        return resp
      })
      .then((resp) => {
        let series = updatePackVis(resp.data)
        dispatch({
          type: PACK_VIS,
          payload: series
        })
      })
  }
}

export function removeItemFromList(packId, categoryId, itemId) {
  const USER_ID = localStorage.getItem('userId')
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}/categories/${categoryId}/items/${itemId}`)
      .then((resp) => {
        dispatch({
          type: READ_PACK,
          payload: resp.data
        })
        return resp
      })
      .then((resp) => {
        let series = updatePackVis(resp.data)
        dispatch({
          type: PACK_VIS,
          payload: series
        })
      })
  }
}

export function updateItem(packId, categoryId, itemId, item) {
  const USER_ID = localStorage.getItem('userId')
  const response = axios.patch(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}/categories/${categoryId}/items/${itemId}`, item)
    .then((resp) => resp.data)

  return {
    type: CREATE_PACK,
    payload: response
  }
}


export function getPackVisData(pack) {

  const series = updatePackVis(pack)

  return {
    type: PACK_VIS,
    payload: series
  }
}


function updatePackVis(pack) {
  let series = []
  let maxItems = 0

  pack.categories.forEach((category) => {
    if (category.items.length > maxItems)
      maxItems = category.items.length
  })

  for (let i = 0; i < maxItems; i++) {
    let seriesInstance = []
    pack.categories.forEach((category) => {
      let obj = {}
      if (category.items[i] && category.items[i].weight) {
        obj.x = category.items[i].weight * category.items[i].quantity
        obj.weight = category.items[i].weight * category.items[i].quantity
      }
      else {
        obj.x = 0
        obj.weight = 0
      }
      if (category.items[i] && category.items[i].title)
        obj.title = category.items[i].title
      else
        obj.title = ''
      obj.y = category.title
      seriesInstance.push(obj)
    })
    series.push(seriesInstance)
  }

  return series
}
