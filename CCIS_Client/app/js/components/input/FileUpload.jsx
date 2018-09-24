'use strict'

import React from 'react'

// import { Upload, Icon, message } from 'antd'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'

import * as globalFunctions from '../../globalFunctions'

const Dragger = Upload.Dragger;

// Properties:
//  - callback : callback to send filter value

class FileUpload extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
    this.onCustomRequest = this.onCustomRequest.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.uploadFile = this.uploadFile.bind(this)

    this.state = {
      fileList: []
    }
  }

  removeFile(file) {
    console.log("REMOVE", file)
    return true
  }

  uploadFile(file) {
    console.log("UPLOAD", file)
    return true
  }

  onChange(info) {

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    let fileList = info.fileList;
    let oldFile = fileList[0]

    if (oldFile && fileList.length > 1) {
      //Remove old file from server
      this.removeFile(oldFile)
    }

    fileList = fileList.slice(-1);
    this.setState({ fileList })

    //Get status
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    }
    else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }

    //Raise callback
    // let { callback } = this.props
    // if (typeof callback !== 'undefined') {
    //   callback(value)
    // }
  }

  onCustomRequest(handler) {

    return new Promise(((resolve, reject) => {

      //UPLOAD FILE HERE//    
      const uploadRes = this.uploadFile(handler.file)

      setTimeout(() => {
        if (uploadRes) {
          resolve(handler.onSuccess('Success'))
        }
        else {
          reject(handler.onError())
        }
      }, 1000)

    }))
  }


  render() {

    let { width, height, style } = this.props
    let { fileList } = this.state

    width = globalFunctions.fixEmptyValue(width, "315px")
    height = globalFunctions.fixEmptyValue(height, "90px")

    return (
        <div className="text-center" style={{
          padding: "10px",
          width: width,
          backgroundColor: "whitesmoke",
          border: "1px dotted grey",
          borderRadius: "5px",
          marginBottom: "15px",
          ...style
        }}>
          <Dragger
            name="file"
            onChange={this.onChange}
            customRequest={this.onCustomRequest}
            onRemove={this.removeFile}
            fileList={fileList}
            style={{ cursor: "pointer" }}
          >
            <div style={{
              backgroundColor: "Gainsboro",
              border: "1px dotted grey",
              padding: "7px",
              borderRadius: "2px",
              marginBottom: fileList.length > 0 ? "12px" : "0px"
            }}>
              <p className="ant-upload-drag-icon text-center" style={{ marginBottom: "3px"}}>
                <Icon type="to-top" theme="outlined" style={{ fontSize: "36px", marginTop: "8px", marginBottom: "5px" }} />
                <br/>
                Click or drag file to this area to upload
              </p>
            </div>
          </Dragger>
        </div>
    )
  }
}

export default FileUpload