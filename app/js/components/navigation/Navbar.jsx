'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Navbar as MDBNavbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'mdbreact'
import { ssoBaseURL } from '../../config/ssoBaseURL'

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  let { navigation: { locationHash } } = state
  return { user, locationHash }
}

class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      collapse: false,
      isWideEnough: false,
      listsDropOpen: false
    }

    this.onClick = this.onClick.bind(this)
    this.listsDropToggle = this.listsDropToggle.bind(this)
    this.LoginLogout = this.LoginLogout.bind(this)
    this.GetUser = this.GetUser.bind(this)
    this.Register = this.Register.bind(this)
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  listsDropToggle() {
    this.setState({
      listsDropOpen: !this.state.listsDropOpen
    });
  }

  LoginLogout() {

    let { user } = this.props

    if (!user || user.expired) {
      return <a className="nav-link" href="#/login">Login</a>
    }
    else {
      return <a className="nav-link" href="#/logout">Logout</a>
    }
  }

  Register() {
    let { user } = this.props

    if (!user || user.expired) {
      return <a key="lnkRegister" className="nav-link" href={ssoBaseURL + "Account/Register"} target="_blank">Register</a>
    }
  }

  GetUser() {
    let { user } = this.props

    if (!user || user.expired) {
      return <span style={{ color: "#d0d6e2" }} className="nav-link"></span>
    }
    else {
      return <span style={{ color: "#d0d6e2" }} className="nav-link">{"Hello, " + user.profile.email}</span>
    }
  }

  render() {

    let { locationHash, user } = this.props

    return (
      <MDBNavbar size="sm" color="white" dark expand="md" style={{ boxShadow: "none", borderTop: "1px solid gainsboro" }} >
        {!this.state.isWideEnough && <NavbarToggler style={{ backgroundColor: "#2BBBAD" }} onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>

          {/* LEFT */}
          <NavbarNav left>
            {/* Home */}
            <NavItem style={{ borderBottom: (locationHash === "#/" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <a className="nav-link" href="#"><b style={{ color: "black" }}>Home</b></a>
            </NavItem>

            {/* About */}
            <NavItem style={{ borderBottom: (locationHash === "#/about" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <a className="nav-link" href="#/about"><b style={{ color: "black" }}>About</b></a>
            </NavItem>

            {/* DAO */}
            <NavItem style={{ borderBottom: (locationHash === "#/DAO" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <a className="nav-link" href="#/DAO"><b style={{ color: "black" }}>DAO</b></a>
            </NavItem>
          </NavbarNav>

          {/* RIGHT */}
          <NavbarNav right>

            {/* DAO */}
            <NavItem style={{ borderBottom: (locationHash === "#/contact" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
              <a className="nav-link" href="#/contact"><b style={{ color: "black" }}>Contact</b></a>
            </NavItem>

            {/* Username */}
            {(user && !user.expired) &&
              <NavItem style={{ marginLeft: "15px" }}>
                <span className="nav-link">
                  <b style={{ color: "#2BBBAD" }}>
                    {"Hello, " + user.profile.email}
                  </b>
                </span>
              </NavItem>
            }

            {/* Login / Logout */}
            <NavItem style={{ marginLeft: "15px" }}>
              {(!user || user.expired) &&
                <a className="nav-link" onClick={this.LoginLogoutClicked} href="#/login">
                  <b style={{ color: "black" }}>
                    Login
                  </b>
                </a>
              }
              {(user && !user.expired) &&
                <a className="nav-link" onClick={this.LoginLogoutClicked} href="#/logout">
                  <b style={{ color: "black" }}>
                    Logout
                  </b>
                </a>
              }
            </NavItem>

            {/* Register */}
            {(!user || user.expired) &&
              <NavItem style={{ marginLeft: "15px" }}>
                <a key="lnkRegister" className="nav-link" href={ssoBaseURL + "Account/Register"} target="_blank">
                  <b style={{ color: "black" }}>
                    Register
                  </b>
                </a>
              </NavItem>
            }

          </NavbarNav>

        </Collapse>
      </MDBNavbar>
    )
  }
}

export default connect(mapStateToProps)(Navbar)