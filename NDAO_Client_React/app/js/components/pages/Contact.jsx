'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact'

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

class Contact extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    return (
      <>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)