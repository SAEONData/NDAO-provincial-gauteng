'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Navbar as MDBNavbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'mdbreact'
import { ssoBaseURL } from '../../config/ssoBaseURL'
import { DEAGreen, DEAGreenDark } from "../../config/colours.js"

import NCCRD from '../pages/Tools/NCCRD.jsx'
import NWIS from '../pages/Tools/NWIS.jsx';
import SARVA from '../pages/Tools/SARVA.jsx';
import LRT from '../pages/Tools/LRT.jsx';
import DASL from '../pages/Tools/DASL.jsx';
import EWED from '../pages/Tools/EWED.jsx';

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
      listsDropOpen: false,
      showDASL: false,
      showLRT: false,
      showNCCRD: false,
      showNWIS: false,
      showSARVA: false,
      showEWED: false
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
    let { showDASL, showLRT, showNCCRD, showNWIS, showSARVA, showEWED } = this.state

    return (
      <>
        <MDBNavbar size="sm" light expand="md" style={{ boxShadow: "none", borderTop: "1px solid gainsboro" }} >
          {!this.state.isWideEnough && <NavbarToggler style={{ backgroundColor: DEAGreen }} onClick={this.onClick} />}
          <Collapse isOpen={this.state.collapse} navbar>

            {/* LEFT */}
            <NavbarNav left>
              {/* Home */}
              <NavItem style={{ borderBottom: (locationHash === "#/" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
                <NavLink to="/"><b>Home</b></NavLink>
              </NavItem>

              {/* About */}
              <NavItem style={{ borderBottom: (locationHash === "#/about" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
                <NavLink to="about" disabled style={{ color: "grey" }}><b>About</b></NavLink>
              </NavItem>

              {/* Adaptation */}
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret style={{ color: "black" }}><b>Adaptation</b></DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="#/ame">
                      <b>
                        Climate Change Adaptation&nbsp;
                        <br className="d-block d-md-none" />
                        Monitoring and Evaluation
                      </b>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header style={{ marginLeft: "-16px", fontWeight: "400", fontSize: "16px", color: "black" }}>
                      Impacts:
                    </DropdownItem>
                    <DropdownItem href="#" disabled style={{ marginLeft: "7px" }}>
                      <b style={{ color: "grey" }}>Climatic</b>
                    </DropdownItem>
                    <DropdownItem href="#" disabled style={{ marginLeft: "7px" }}>
                      <b style={{ color: "grey" }}>Non Climatic</b>
                    </DropdownItem>
                    <DropdownItem href="#" disabled style={{ marginLeft: "7px" }}>
                      <b style={{ color: "grey" }}>Combined Climatic &amp; Non-Climatic</b>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#" disabled>
                      <b style={{ color: "grey" }}>Impact Early Warning</b>
                    </DropdownItem>
                    <DropdownItem href="#" disabled>
                      <b style={{ color: "grey" }}>
                        Assessing The Effectiveness Of&nbsp;
                        <br className="d-block d-md-none" />
                        Adaptation Responses
                      </b>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>

              {/* Tools */}
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret style={{ color: "black" }}><b>Tools</b></DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => { this.setState({ showNCCRD: true }) }}>
                      Climate Change Responses
                    </DropdownItem>
                    <DropdownItem onClick={() => { this.setState({ showSARVA: true }) }}>
                      Risk And Vulnerability Hotspots
                    </DropdownItem>
                    <DropdownItem onClick={() => { this.setState({ showNWIS: true }) }}>
                      National Water Information System
                    </DropdownItem>
                    <DropdownItem onClick={() => { this.setState({ showLRT: true }) }}>
                      Lets Respond Toolkit
                    </DropdownItem>
                    <DropdownItem onClick={() => { this.setState({ showDASL: true }) }}>
                      Dam And Stream Levels
                    </DropdownItem>
                    <DropdownItem onClick={() => { this.setState({ showEWED: true }) }}>
                      Extreme Weather Events Database
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>

            </NavbarNav>

            <hr className="d-block d-md-none" />

            {/* RIGHT */}
            <NavbarNav right>

              {/* Username */}
              {(user && !user.expired) &&
                <NavItem style={{ marginRight: "15px" }}>
                  <NavLink to="#" disabled>
                    <b style={{ color: "#2BBBAD" }}>
                      {"Hello, " + user.profile.email}
                    </b>
                  </NavLink>
                </NavItem>
              }

              {/* Contact */}
              <NavItem style={{ marginRight: "15px", borderBottom: (locationHash === "#/contact" ? "4px solid dimgrey" : "0px solid white") }}>
                <NavLink disabled to="contact" style={{ color: "grey" }}><b>Contact</b></NavLink>
              </NavItem>

              {/* Login / Logout */}
              <NavItem style={{ marginRight: "15px" }}>
                {(!user || user.expired) &&
                  <NavLink to="login" disabled style={{ color: "grey" }}><b>Login</b></NavLink>
                }
                {(user && !user.expired) &&
                  <NavLink to="logout" disabled style={{ color: "grey" }}><b>Logout</b></NavLink>
                }
              </NavItem>

              {/* Register */}
              {(!user || user.expired) &&
                <NavItem>
                  <a disabled key="lnkRegister" className="nav-link" href={ssoBaseURL + "Account/Register"} target="_blank">
                    <b style={{ color: "grey"}}>Register</b>
                  </a>
                </NavItem>
              }

            </NavbarNav>

          </Collapse>
        </MDBNavbar >

        {showDASL && <DASL closeCallback={() => { this.setState({ showDASL: false }) }} />}
        {showLRT && <LRT closeCallback={() => { this.setState({ showLRT: false }) }} />}
        {showNCCRD && <NCCRD closeCallback={() => { this.setState({ showNCCRD: false }) }} />}
        {showNWIS && <NWIS closeCallback={() => { this.setState({ showNWIS: false }) }} />}
        {showSARVA && <SARVA closeCallback={() => { this.setState({ showSARVA: false }) }} />}
        {showEWED && <EWED closeCallback={() => { this.setState({ showEWED: false }) }} />}
      </>
    )
  }
}

export default connect(mapStateToProps)(Navbar)