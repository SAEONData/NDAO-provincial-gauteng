'use strict'

import { Button, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Fa, Navbar as MDBNavbar, NavbarNav, NavbarToggler, NavItem, NavLink } from 'mdbreact';
import React from 'react';
import { connect } from 'react-redux';
import { DEAGreen } from "../../Config/colours.cfg";
import { ssoBaseURL } from '../../Config/serviceURLs.cfg';
import DASL from '../Pages/Tools/DASL.jsx';
import NDMC from '../Pages/Tools/NDMC.jsx';
import LRT from '../Pages/Tools/LRT.jsx';
import NCCRD from '../Pages/Tools/NCCRD.jsx';
import NWIS from '../Pages/Tools/NWIS.jsx';
import SARVA from '../Pages/Tools/SARVA.jsx';
import { data as NavData } from '../../../data/sideNavData'

const _gf = require('../../globalFunctions')

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  let { general: { showSideNav } } = state
  let { navigation: { locationHash } } = state
  return { user, locationHash, showSideNav }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideNav: payload => {
      dispatch({ type: "TOGGLE_SIDENAV", payload })
    }
  }
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
      showNDMC: false
    }

    this.onClick = this.onClick.bind(this)
    this.listsDropToggle = this.listsDropToggle.bind(this)
  }

  // componentDidUpdate(){
  //   let { user } = this.props
  //   if(user){
  //     console.log("USER", user)
  //   }
  // }

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

  render() {

    let { locationHash, user, showSideNav, toggleSideNav } = this.props
    let { showDASL, showLRT, showNCCRD, showNWIS, showSARVA, showNDMC } = this.state

    return (
      <>
        <MDBNavbar
          size="sm"
          color="white"
          light
          expand="md"
          style={{
            boxShadow: "0px 15px 10px -15px gainsboro",
            borderTop: "1px solid #E8E8E8",
          }}
        >

          {!this.state.isWideEnough && <NavbarToggler style={{ backgroundColor: DEAGreen }} onClick={this.onClick} />}
          <Collapse isOpen={this.state.collapse} navbar>

            {/* LEFT */}
            <NavbarNav left>

              {/* <Button size="sm" color="grey" onClick={() => { toggleSideNav(!showSideNav) }}
                style={{ width: "45px", marginLeft: "0px", marginRight: "15px", paddingLeft: "18px" }}>
                <Fa icon="bars" />
              </Button> */}

              {
                NavData.enabled &&
                <Button size="sm" color="grey" onClick={() => { toggleSideNav(!showSideNav) }}
                  style={{ width: "45px", marginLeft: "0px", marginRight: "15px", paddingLeft: "18px" }}>
                  <Fa icon="bars" />
                </Button>
              }

              {/* Home */}
              <NavItem style={{ borderBottom: (locationHash === "#/" ? "4px solid dimgrey" : "0px solid white"), marginRight: "15px" }}>
                <NavLink to="/"><b>Home</b></NavLink>
              </NavItem>

              {/* Adaptation */}
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret style={{ color: "black" }}><b>Adaptation M&amp;E</b></DropdownToggle>
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
                    <DropdownItem onClick={() => { window.open("http://niwis.dws.gov.za/niwis2/", "_blank") /*this.setState({ showNWIS: true })*/ }}>
                      National Water Information System
                    </DropdownItem>
                    <DropdownItem onClick={() => { window.open("http://www.letsrespondtoolkit.org/", "_blank") /*this.setState({ showLRT: true })*/ }}>
                      Lets Respond Toolkit
                    </DropdownItem>
                    <DropdownItem onClick={() => { window.open("https://www.dwa.gov.za/Hydrology/Weekly/Province.aspx", "_blank") /*this.setState({ showDASL: true })*/ }}>
                      Dam And Stream Levels
                    </DropdownItem>
                    <DropdownItem onClick={() => { this.setState({ showNDMC: true }) }}>
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
                    <b style={{ color: DEAGreen }}>
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
                  <NavLink to="/login"><b>Login</b></NavLink>
                }
                {(user && !user.expired) &&
                  <NavLink to="/logout"><b>Logout</b></NavLink>
                }
              </NavItem>

              {/* Register */}
              {(!user || user.expired) &&
                <NavItem>
                  <a key="lnkRegister" className="nav-link" href={ssoBaseURL + "Account/Register"} target="_blank">
                    <b>Register</b>
                  </a>
                </NavItem>
              }

            </NavbarNav>

          </Collapse>

          {showDASL && <DASL closeCallback={() => { this.setState({ showDASL: false }) }} />}
          {showLRT && <LRT closeCallback={() => { this.setState({ showLRT: false }) }} />}

          {
            showNCCRD &&
            <NCCRD
              query={`?navbar=hidden&daoid=hidden&readonly=true&popin=hidden`}
              closeCallback={() => { this.setState({ showNCCRD: false }) }}
            />
          }

          {showNWIS && <NWIS closeCallback={() => { this.setState({ showNWIS: false }) }} />}
          {showSARVA && <SARVA closeCallback={() => { this.setState({ showSARVA: false }) }} />}
          {showNDMC && <NDMC closeCallback={() => { this.setState({ showNDMC: false }) }} />}

        </MDBNavbar >

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)