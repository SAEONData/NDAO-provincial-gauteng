//Styles - Ant.Design (has to be loaded before MDB so that MDB can replace all applicable styles)
import 'antd/lib/style/index.css'

//Styles - MDB
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

//Components
import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home/Home.jsx'
import Login from './components/authentication/Login.jsx'
import Logout from './components/authentication/Logout.jsx'
import Navbar from './components/navigation/Navbar.jsx'
import Footer from './components/navigation/Footer.jsx'
import CallbackPage from '../js/components/authentication/callback.jsx';
import LoadingPanel from './components/input/LoadingPanel.jsx'
import Header from './components/navigation/Header.jsx';
import AME from './components/pages/Adaptation/MonitoringEvaluation/AME.jsx';
import SideNav from './components/navigation/SideNav.jsx'
import userManager from './components/authentication/userManager'

//Data
const Oidc = require("oidc-client")
import { data as NavData } from '../data/sideNavData'
const _gf = require('./globalFunctions')

const mapStateToProps = (state, props) => {
  let { general: { loading, showSideNav } } = state
  return { loading, showSideNav }
}

//Enable OIDC Logging
Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

class App extends React.Component {

  constructor(props) {
    super(props);

    this.saveCurrentURL = this.saveCurrentURL.bind(this)

    let showNavbar = true
    if (location.toString().includes("navbar=hidden")) {
      showNavbar = false
    }

    this.state = {
      navbar: showNavbar,
      currentURL: ""
    }
  }

  async componentDidMount() {
    this.saveCurrentURL()
    window.onhashchange = this.saveCurrentURL

    try {
      await userManager.signinSilent()
    }
    catch (ex) {
      console.warn("Sign-in-silent failed!", ex)
    }
  }

  ignoreURL() {

    let ignore = false

    const ignoreURLs = [
      "#/login",
      "#/logout",
      "#/callback"
    ]

    ignoreURLs.forEach(x => {
      if (location.hash.includes(x) && !ignore) {
        ignore = true
      }
    })

    return ignore
  }

  saveCurrentURL() {

    if (location.hash !== this.state.currentURL && !this.ignoreURL()) {
      console.log("NAV", location.hash)
      this.setState({ currentURL: location.hash })
      _gf.SaveCurrentUrl()
    }
  }

  render() {

    let { loading, showSideNav } = this.props
    let { navbar } = this.state

    return (
      <div style={{ backgroundColor: "white" }}>
        <Router>
          <div>

            {navbar && <Header />}
            {navbar && <Navbar />}

            {
              NavData.enabled &&
              <SideNav data={NavData} isOpen={showSideNav} />
            }

            <div style={{ height: "15px", backgroundColor: "whitesmoke" }} />

            <div style={{ backgroundColor: "whitesmoke" }}>
              <div style={{ margin: "0px 15px 0px 15px" }}>
                <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/login" component={Login} exact />
                  <Route path="/logout" component={Logout} exact />
                  <Route path="/callback" component={CallbackPage} />
                  <Route path="/ame" component={AME} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>

            <div style={{ height: "15px", backgroundColor: "whitesmoke" }} />

            <Footer />

            <LoadingPanel enabled={loading} />

          </div>

        </Router>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
