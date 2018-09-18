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

class LRT extends React.Component {

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
          title="Lets Respond Toolkit"
          source="http://www.letsrespondtoolkit.org/"
          showSource={true}
          closeCallback={closeCallback}
         />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LRT)