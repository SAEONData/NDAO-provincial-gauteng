'use strict'

export default function GeneralReducer(state = {}, action) {

  let { type, payload } = action

  switch (type) {

    case 'SET_LOADING':
      return {
        ...state, loading: payload
      }

    case "TOGGLE_SIDENAV":
      return {
        ...state, showSideNav: payload
      }

    default:
      return state

  }
}
