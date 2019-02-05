'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact'

// import AME from '../../../../../images/AME.png'

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

class About extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    return (
      <>
        <p>
          The National Development Plan and South Africa’s National Climate Change Response White
          Paper states that robust monitoring and evaluation is essential to assess progress towards
          its objective to build climate resilience. In terms of adaptation, this will largely be
          delivered through plans, policies and actions stimulated by South Africa’s National Adaptation
          Strategy, National Framework on Climate Services and through the adaptation goals set out in
          its Nationally Determined Contribution under the Paris Agreement.
        </p>
        <p>
          The Paris Agreement highlights the importance of monitoring, evaluation and learning from
          adaptation practice (Article 7, para 9d). To understand progress towards achieving climate
          resilient development, it requires all countries to provide information on climate change
          impacts and adaptation. It also stipulates a ‘global stocktake’, which will include a review
          of adaptation effectiveness and progress made towards the global adaptation goal.
        </p>
        <p>
          South Africa Climate Change Information System provides mechanism for fulfilling South Africa’s
          climate change adaptation obligations under the National Development Plan, National Climate
          Change Response White Paper, South Africa Nationally Determined Contribution and the Paris Agreement.
          This information will be useful for adaptation planning and decision-making, both within
          South Africa and in the wider international community.
        </p>
        <p>
          A simple pragmatic approach has been developed to monitor and evaluate the progress being made
          in achieving individual DAOs using traffic light colours as a scoring system to summarise progress.
        </p>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)