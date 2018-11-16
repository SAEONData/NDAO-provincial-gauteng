'use strict'

import React from 'react'
import { connect } from 'react-redux'
import HostedContentFrame from '../../Layout/HostedContentFrame.jsx'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class EWED extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { closeCallback } = this.props

    return (
      <>
        <br />
        <HostedContentFrame
          title="Extreme Weather Events Database"
          source="http://app01.saeon.ac.za/ndmcsite/#/events"
          showSource={false}
          closeCallback={closeCallback}
         />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EWED)