'use strict'

import React from 'react'
import userManager from '../authentication/userManager'
import Icon from 'antd/lib/icon'

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
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

export default Login