'use strict'

import React from 'react'
import { connect } from 'react-redux';
import {
  SideNav as MSBSideNav, SideNavNav, SideNavCat, SideNavItem, Fa, Container, Button,
  Modal, ModalHeader, ModalFooter, ModalBody, Row, Col
} from 'mdbreact'
import { DEAGreen } from '../../config/colours.cfg'
import TreeInput from '../input/TreeInput.jsx'

import '../../../css/mdbreact-sidenav.css'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSideNav: payload => {
      dispatch({ type: "TOGGLE_SIDENAV", payload })
    }
  }
}

class SideNav extends React.Component {

  constructor(props) {
    super(props)

    this.renderLinks = this.renderLinks.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.showContent = this.showContent.bind(this);

    this.state = { navOpen: [], width: 0, height: 0, showContent: false, contentLink: "", contentTitle: "" }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  toggleNav(key) {

    let { navOpen } = this.state

    if (navOpen.includes(key)) {
      navOpen = navOpen.filter(x => x !== key)
    }
    else {
      navOpen.push(key)
    }

    this.setState({ navOpen })
  }

  renderLinks(data, level = 0) {

    let { navOpen } = this.state
    let links = []
    //let indent = (level > 1 ? 26 * (level - 1) : 0) + "px"

    data.forEach(x => {

      if (typeof x.children !== 'undefined') {
        links.push(
          <SideNavCat
            style={{ fontSize: "15px", fontWeight: "400" }}
            isOpen={navOpen.includes(x.id)}
            key={x.id}
            onClick={() => this.toggleNav(x.id)}
            name={x.text + " "}
            /*icon="chevron-right"*/ >
            {this.renderLinks(x.children, level + 1)}
          </SideNavCat>
        )
      }
      else {
        if (typeof x.link !== 'undefined') {
          links.push(
            <SideNavItem key={x.id} onClick={() => this.showContent(x.link, x.text)} style={{ marginTop: "3px", marginLeft: "-20px" }}>
              <Fa style={{ marginRight: "5px" }} icon="link" />
              {x.text}
            </SideNavItem>
          )
        }
        else {
          links.push(
            <SideNavItem key={x.id} style={{ marginTop: "3px", marginLeft: "-20px" }}>
              <Fa style={{ marginRight: "5px" }} icon="unlink" />
              {x.text}
            </SideNavItem>
          )
        }
      }


    })

    return links
  }

  closeModal() {
    this.setState({ showContent: false })
    this.props.toggleSideNav(false)
  }

  showContent(link, title) {
    this.setState({ showContent: true, contentLink: link, contentTitle: title })
  }

  render() {

    let { isOpen, title, data } = this.props
    let { width, height, showContent, contentLink, contentTitle } = this.state

    const sideNavWidth = 315

    return (
      <>

        {/* <MSBSideNav isOpenWithButton={isOpen} className="white side-nav-light">
          <ModalHeader toggle={() => this.closeModal()}>
            <div className="text-center" style={{ color: "black", marginBottom: "-5px" }}>
              {data.logoTop &&
                <img src={data.logoTop.src} style={{ width: data.logoTop.width }} />
              }
              <hr />
              <h4>{data.title}</h4>
            </div>
          </ModalHeader>
          <ModalBody>
            <SideNavNav style={{ marginLeft: "-25px", marginTop: "-24px" }}>
              {this.renderLinks(data.nav)}
            </SideNavNav>
            <ModalFooter>
              <div className="text-center">
                {data.logoBottom &&
                  <img src={data.logoBottom.src} style={{ width: data.logoBottom.width }} />
                }
              </div>
            </ModalFooter>
          </ModalBody>

          {showContent &&
            <Container style={{
              backgroundColor: "white",
              width: (width - sideNavWidth - 45) + "px",
              height: (height - 30) + "px",
              top: "15px",
              left: (sideNavWidth + 15) + "px",
              position: "fixed"
            }}>

              <h4 style={{ margin: "0px -15px 0px -15px", padding: "5px 10px 5px 10px", backgroundColor: "gainsboro", borderBottom: "1px solid grey" }}>
                {contentTitle}
              </h4>
              <Button
                color="grey"
                size="sm"
                style={{ padding: "3px 6px 3px 6px", position: "absolute", top: "2px", right: "5px" }}
                onClick={() => { this.setState({ showContent: false, contentLink: "", contentTitle: "" }) }}>
                <Fa icon="close" />
              </Button>
              <iframe
                style={{
                  marginLeft: "-15px",
                  marginRight: "0px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  width: (width - sideNavWidth - 45) + "px",
                  height: (height - 70) + "px",
                  border: "0px solid black"
                }}
                src={contentLink}
              />

            </Container>
          }
        </MSBSideNav> */}

        <Modal key={"side-nav-" + isOpen} isOpen={isOpen} toggle={() => this.closeModal()} fullHeight position="left"
          style={{ width: sideNavWidth + "px" }} className={"animated slideInLeft fast"}>

          <ModalHeader toggle={() => this.closeModal()}>
            <div className="text-center" style={{ color: "black", marginBottom: "-5px" }}>
              {data.logoTop &&
                <img src={data.logoTop.src} style={{ width: data.logoTop.width }} />
              }
              <hr />
              <h4>{data.title}</h4>
            </div>
          </ModalHeader>
          <ModalBody>
            <SideNavNav style={{ marginLeft: "-25px", marginTop: "-24px" }}>
              {this.renderLinks(data.nav)}
            </SideNavNav>
            <ModalFooter>
              <div className="text-center">
                {data.logoBottom &&
                  <img src={data.logoBottom.src} style={{ width: data.logoBottom.width }} />
                }
              </div>
            </ModalFooter>
          </ModalBody>

          {showContent &&
            <Container style={{
              backgroundColor: "white",
              width: (width - sideNavWidth - 45) + "px",
              height: (height - 30) + "px",
              top: "15px",
              left: (sideNavWidth + 15) + "px",
              position: "absolute"
            }}>

              <h4 style={{ margin: "0px -15px 0px -15px", padding: "5px 10px 5px 10px", backgroundColor: "gainsboro", borderBottom: "1px solid grey" }}>
                {contentTitle}
              </h4>
              <Button
                color="grey"
                size="sm"
                style={{ padding: "3px 6px 3px 6px", position: "absolute", top: "2px", right: "5px" }}
                onClick={() => { this.setState({ showContent: false, contentLink: "", contentTitle: "" }) }}>
                <Fa icon="close" />
              </Button>
              <iframe
                style={{
                  marginLeft: "-15px",
                  marginRight: "0px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  width: (width - sideNavWidth - 45) + "px",
                  height: (height - 70) + "px",
                  border: "0px solid black"
                }}
                src={contentLink}
              />

            </Container>
          }

        </Modal>
      </>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)