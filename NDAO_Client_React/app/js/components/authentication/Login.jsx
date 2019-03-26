

'use strict'

import React from 'react'
import userManager from '../authentication/userManager'
import Icon from 'antd/lib/icon'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  let { general: { loading } } = state 
  return { loading }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    },
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
     //Hide loading and redirect to IDS
     this.props.updateNav(location.hash)
     this.props.setLoading(false)
     userManager.signinRedirect()
  }

  render() {

    return (
      <>
        <div style={{ marginLeft: "22px" }}>
          <br />
          <Icon type="loading" theme="outlined" />
          &nbsp;
          Redirecting...
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)