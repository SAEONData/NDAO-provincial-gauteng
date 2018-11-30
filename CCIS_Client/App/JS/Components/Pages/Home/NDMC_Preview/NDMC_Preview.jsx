import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../../../Images/Icons/popout.png'
import OData from 'react-odata'
import EventCard from './EventCard.jsx'
import { ndmcBaseURL, ndmcSiteBaseURL } from '../../../../Config/serviceURLs.cfg'
import NDMC from '../../Tools/NDMC.jsx'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class NDMC_Preview extends React.Component {

  constructor(props) {
    super(props);

    this.onMessage = this.onMessage.bind(this)

    this.state = {
      showNDMC: ""
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.onMessage.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.onMessage)
  }

  onMessage(event) {

    //console.log("event", event)

    // Check sender origin to be trusted
    if (ndmcSiteBaseURL.includes(event.origin)) {

      var data = event.data;

      if (data.action === "showDetails") {
        this.setState({ showNDMC: data.value })
      }

    }
  }

  render() {

    let { showNDMC } = this.state

    let NDMC_Config = {
      header: false,
      navbar: false,
      sidenav: false,
      footer: false,
      backToList: false,
      listOptions: {
        expandCollapse: false,
        view: true,
        favorites: false,
        filters: false,
        detailsInParent: true
      }
    }

    return (
      <>
        <iframe
          style={{
            border: "none",
            height: 437,
            width: "100%"
          }}
          src={`${ndmcSiteBaseURL}events?config=${encodeURI(JSON.stringify(NDMC_Config))}`}
        />

        {
          (showNDMC !== "") &&
          <NDMC
            path={`events/${showNDMC}`}
            query={`?config=${encodeURI(JSON.stringify(NDMC_Config))}`}
            closeCallback={() => { this.setState({ showNDMC: "" }) }}
          />
        }

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NDMC_Preview)