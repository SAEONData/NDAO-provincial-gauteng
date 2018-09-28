'use strict'

import React from 'react'
import {
  Container, Row, Col, View, Mask, Button, Fa
} from 'mdbreact';
import { isEmptyValue } from '../../globalFunctions'
import { DEAGreen } from '../../config/colours.cfg'

import map_gp from '../../../images/static_maps_gp.png'
import map_sa from '../../../images/static_maps_sa.png'

//AntD Carousel
import Carousel from 'antd/lib/carousel'
import 'antd/lib/carousel/style/css'
import '../../../css/antd.carousel.css'

const _ = require('lodash')

class MapsCarouselView extends React.Component {

  constructor(props) {
    super(props);

    this.autoplay = this.autoplay.bind(this)
    this.start_stop = this.start_stop.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)

    this.state = { data: [], autoplay: true }
  }

  componentDidMount() {
    this.getData()
    this.autoplay()
  }

  getData() {

    //Map & Load test data
    let data = []

    data.push({
      title: "South Africa",
      description: "",
      imageSrc: map_sa
    })

    data.push({
      title: "Gauteng",
      description: "",
      imageSrc: map_gp
    })

    this.setState({ data })
  }

  renderItems() {

    let { data } = this.state
    let items = []

    if (typeof data !== 'undefined') {
      data.map(item => {

        let index = _.indexOf(data, item) + 1
        let contentCol = isEmptyValue(item.imageSrc) ? "12" : "8"
        let descriptionItems = []

        let testVal = item.description.split("\n").filter(x => x !== "" && x !== "\r")
        if (testVal.length > 0) {
          descriptionItems = testVal
        }
        else {
          descriptionItems.push(item.description)
        }

        items.push(
          <div key={"carouselItem_" + index.toString()} id={index}>
            <Row>
              <Col md="12" style={{ margin: "auto" }}>
                <div className="d-flex align-items-center flex-column justify-content-center">
                  <h4>
                    <b>{item.title}</b>
                  </h4>
                  <img style={{ verticalAlign: "middle", width: "100%" }} src={item.imageSrc} />
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

    let { data, autoplay } = this.state

    if (data.length > 0) {
      return (
        <Container>
          <br />
          <Carousel ref={slider => (this.slider = slider)} /*autoplay*/>
            {this.renderItems()}
          </Carousel>

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
        </Container >
      );
    }
    else {
      return (<h4>No data!</h4>)
    }
  }
}

export default MapsCarouselView