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

class NWIS extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    return (
      <>
        <br />
        <HostedContentFrame
          title="National Water Information System"
          source="http://niwis.dws.gov.za/niwis2/"
          showSource={true}
         />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NWIS)