'use strict'

import React from 'react'
import { connect } from 'react-redux'
import HostedContentFrame from '../../layout/HostedContentFrame.jsx'

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

class NCCRD extends React.Component {

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
          title="Climate Change Responses"
          source="http://app01.saeon.ac.za/nccrdsite/#/projects?navbar=hidden"
          closeCallback={closeCallback}
         />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NCCRD)