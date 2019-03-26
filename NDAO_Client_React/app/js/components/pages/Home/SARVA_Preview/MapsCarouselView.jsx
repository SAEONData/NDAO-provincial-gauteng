'use strict'

import React from 'react'
import { Row, Col, Button, Fa, CardTitle, CardText } from 'mdbreact'
import { DEAGreen } from '../../../../config/colours.js'
import { Carousel } from 'antd'

//images
import sarva_ct from '../../../../../images/Maps/sarva_ct.png'
import sarva_gp from '../../../../../images/Maps/sarva_gp.png'
import sarva_kzn from '../../../../../images/Maps/sarva_kzn.png'

const _ = require('lodash')

class MapsCarouselView extends React.Component {

  constructor(props) {
    super(props);

    this.autoplay = this.autoplay.bind(this)
    this.start_stop = this.start_stop.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)

    this.state = {
      data: [],
      autoplay: true,
      showButtons: false
    }
  }

  componentDidMount() {
    this.getData()
    this.autoplay()
  }

  getData() {

    //Map & Load test data
    let data = []

    data.push({
      title: "Western Cape",
      description: "SDG 4.1.1A Hotspot analysis of high school dropout rates",
      imageSrc: sarva_ct
    })

    data.push({
      title: "Gauteng",
      description: "SDG 4.1.1A Hotspot analysis of high school dropout rates",
      imageSrc: sarva_gp
    })

    data.push({
      title: "KwaZulu Natal",
      description: "SDG 4.1.1A Hotspot analysis of high school dropout rates",
      imageSrc: sarva_kzn
    })

    this.setState({ data })
  }

  renderItems() {

    let { clickCallback } = this.props
    let { data } = this.state
    let items = []

    if (typeof data !== 'undefined') {
      data.map(item => {

        let index = _.indexOf(data, item) + 1

        items.push(
          <div key={"carouselItem_" + index.toString()} id={index}>
            <Row>

              <Col md="12" style={{ margin: "auto" }}>
                <div className="d-flex align-items-center flex-column justify-content-center">

                  <CardTitle style={{ textAlign: "center", fontSize: "16px", margin: "0px 10px 5px 10px" }}>
                    <b>{item.title}</b>
                  </CardTitle >

                  <CardText style={{ textAlign: "center", wordWrap: "break-word", fontSize: "14px", margin: "0px 10px 10px 10px" }}>
                    {item.description}
                  </CardText>

                  <img
                    style={{
                      maxWidth: "90%",
                      maxHeight: "270px",
                      cursor: "pointer"
                    }}
                    src={item.imageSrc}
                    onClick={() => { clickCallback() }}
                  />
                </div>

              </Col>

            </Row>
            <br />
          </div>
        )
      })
    }

    return items
  }

  autoplay() {
    this.next(true)
    setTimeout(this.autoplay, 10000)
  }

  start_stop() {
    this.setState({ autoplay: !this.state.autoplay })
  }

  next(auto) {

    if (auto == true && !this.state.autoplay) {
      return
    }

    if (this.slider) {
      this.slider.next()
    }
  }

  prev(auto) {

    if (auto === true && !this.state.autoplay) {
      return
    }

    if (this.slider) {
      this.slider.prev()
    }
  }

  render() {

    let { data, autoplay, showButtons } = this.state

    if (data.length > 0) {
      return (
        <div style={{ margin: "0px" }}>
          <Carousel
            ref={slider => (this.slider = slider)}
            /*autoplay*/
            style={{ border: "none" }}
          >
            {this.renderItems()}
          </Carousel>

          {
            (showButtons === true) &&
            <div style={{ textAlign: "center" }}>
              <Button color="" style={{ backgroundColor: DEAGreen }} floating onClick={this.prev}>
                <Fa icon="step-backward" />
              </Button>
              <Button color="" style={{ backgroundColor: DEAGreen }} floating onClick={this.start_stop}>
                <Fa icon={autoplay === true ? "pause" : "play"} />
              </Button>
              <Button color="" style={{ backgroundColor: DEAGreen }} floating onClick={this.next}>
                <Fa icon="step-forward" />
              </Button>
            </div>
          }

        </div >
      )
    }
    else {
      return (<h4>No data!</h4>)
    }
  }
}

export default MapsCarouselView