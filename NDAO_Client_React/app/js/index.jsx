// IE fixes
import 'whatwg-fetch'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill() // kick off the polyfill!
// IE fixes

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import userManager from './components/authentication/userManager'
import { OidcProvider } from 'redux-oidc'
import App from './App.jsx'

//Favicon
import Favicon from 'react-favicon'
import favicon_image from '../images/favicon.png'

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <div>
          <Favicon url={favicon_image} />
          <Component />
        </div>
      </OidcProvider>
    </Provider>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => { render(App) })
}