'use strict'

import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reducers from './reducers'
import { loadUser } from 'redux-oidc'
import userManager from './components/authentication/userManager'
import { reducer as oidcReducer } from 'redux-oidc';

const store = createStore(
  combineReducers({ oidc: oidcReducer, ...reducers, router: routerReducer }), {

    general: {
      loading: false,
      showSideNav: false
    },
    navigation: {
      locationHash: "#/"
    }

  }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
loadUser(store, userManager)

export default store