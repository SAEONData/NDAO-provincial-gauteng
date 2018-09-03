'use strict'

export default function GeneralReducer(state = {}, action) {

  let { type, payload } = action

  switch (type) {

    case 'SET_LOADING':

      return {
        ...state, loading: payload
      }

    default:
      return state

  }
}
