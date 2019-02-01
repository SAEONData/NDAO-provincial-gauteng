import React from 'react'
import { connect } from 'react-redux'
import userManager from '../authentication/userManager'
import Icon from 'antd/lib/icon'

const _gf = require("../../globalFunctions")

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.userSignedOut = this.userSignedOut.bind(this)
    this.state = { signoutRequest: {} }
  }

  userSignedOut() {

    userManager.removeUser()

    //Back to last page
    let locHash = "#"
    let lastUrl = _gf.ReadLastUrl()
    if (!lastUrl.endsWith("logout")) {
      locHash = lastUrl
    }
    location = locHash
  }

  componentDidMount() {

    this.props.updateNav(location.hash)

    this.logoutGlobal()
    //this.logoutLocal()
  }

  logoutGlobal() {
    let { user } = this.props
    if (user && !user.expired) {

      //Register signout event
      userManager.events.addUserSignedOut(this.userSignedOut)

      //Get signout url and push to state
      userManager.createSignoutRequest()
        .then(res => {
          if (res) {
            this.setState({ signoutRequest: res })
          }
        })
    }
  }

  // logoutLocal() {
  //   let { user } = this.props
  //   if (user && !user.expired) {
  //     userManager.revokeAccessToken()
  //     userManager.removeUser()
  //   }
  //   setTimeout(this.userSignedOut, 500)
  // }

  componentWillUnmount() {
    //Unregister signout event
    userManager.events.removeUserSignedOut(this.userSignedOut)
  }

  render() {

    let { signoutRequest } = this.state

    return (
      <>
        <br />
        <div style={{ marginLeft: "22px" }}>
          <Icon type="loading" theme="outlined" />
          &nbsp;
          Logging out...
        </div>

        {/* Handle signout in hidden iframe */}
        {signoutRequest !== "" &&
          <iframe hidden src={signoutRequest.url} />
        }

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)