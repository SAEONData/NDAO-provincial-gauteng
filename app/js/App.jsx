//Styles - Ant.Design (has to be loaded before MDB so that MDB can replace all applicable styles)
import 'antd/lib/style/index.css'

//Styles - MDB
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

//Components
import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import Login from './components/Authentication/Login.jsx'
import Logout from './components/Authentication/Logout.jsx'
import Navbar from './components/navigation/Navbar.jsx'
import Footer from './components/navigation/Footer.jsx'
import CallbackPage from '../js/components/Authentication/callback.jsx';
import LoadingPanel from './components/input/LoadingPanel.jsx'
import Header from './components/navigation/Header.jsx';
import About from './components/pages/About.jsx';
import DAO from './components/pages/DAO.jsx';
import Contact from './components/pages/Contact.jsx';

const mapStateToProps = (state, props) => {
  let { general: { loading } } = state
  return { loading }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    let showNavbar = true
    if (location.toString().includes("navbar=hidden")) {
      showNavbar = false
    }

    this.state = { navbar: showNavbar }
  }


  render() {

    let { loading } = this.props
    let { navbar } = this.state


    return (
      <div className="container">
        <Router>
          <div>

            {navbar && <Header/>}
            {navbar && <Navbar/>}

            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/DAO" component={DAO} />
              <Route path="/contact" component={Contact} exact />
              <Route path="/logout" component={Logout} exact />
              <Route path="/callback" component={CallbackPage} />
            </Switch>

            <br />
            <Footer />

            <LoadingPanel enabled={loading} />

          </div>

        </Router>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
