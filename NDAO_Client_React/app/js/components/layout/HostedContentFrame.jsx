'use strict'

import React from 'react'
import * as globalFunctions from '../../globalFunctions'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'
import loader from '../../../images/Other/loader.gif'
import { Button } from 'antd';
import { DEAGreen } from '../../config/colours';

// Properties:
//  - source : Component label
//  - width : Width; Default - 100%
//  - height : Height; Default - 500px
//  - showSource: Toggle display source link; Default - false

class HostedContentFrame extends React.Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this)
    this.state = { showModal: true }
  }

  toggleModal() {

    let { closeCallback } = this.props

    //this.setState({ showModal: false })
    //location.hash = "#"

    if (typeof closeCallback !== 'undefined') {
      closeCallback()
    }
  }

  render() {

    let { source, width, height, showSource, title } = this.props

    source = globalFunctions.fixEmptyValue(source, "http://www.example.com")
    width = globalFunctions.fixEmptyValue(width, "100%")
    height = globalFunctions.fixEmptyValue(height, "73vh")
    showSource = globalFunctions.fixEmptyValue(showSource, false)

    return (
      <div>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal} size="fluid" fullHeight position="top" style={{ width: "95%" }} >
          <ModalHeader toggle={this.toggleModal}>{title}
        
          </ModalHeader>
          <ModalBody>
            <iframe
              style={{
                width: width,
                height: height,
                margin: "0px",
                border: "1px solid gainsboro",
                backgroundImage: `url(${loader})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 50%"
              }}
              src={source}
              
            />
            <span hidden={!showSource} style={{ fontSize: "small", fontStyle: "italic" }}>
              &nbsp;source: <a href={source} target="#"><u>{source}</u></a>
            </span>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="" style={{ backgroundColor: DEAGreen }} onClick={this.toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default HostedContentFrame