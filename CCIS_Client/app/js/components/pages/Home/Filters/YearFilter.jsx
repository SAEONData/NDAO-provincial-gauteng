import React from 'react'
import { Row, Col } from 'mdbreact'

//Ant.D
import Slider from 'antd/lib/slider'
import 'antd/lib/slider/style/css'

class YearFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { value, callback } = this.props
    let currentYear = (new Date()).getFullYear()

    return (
      <>
        <Row>
          <Col md="12">
            <Slider
              min={currentYear - 6}
              max={currentYear}
              value={value}
              style={{ marginLeft: "7px", marginRight: "7px" }}
              onChange={(value) => { callback(value) }}
            />
          </Col>
        </Row>
      </>
    )
  }
}

export default YearFilter