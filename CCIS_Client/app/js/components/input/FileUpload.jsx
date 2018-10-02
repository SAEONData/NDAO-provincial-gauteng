'use strict'

import React from 'react'
import { connect } from 'react-redux'
const _gf = require('../../globalFunctions')

//Ant.D
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'

import * as globalFunctions from '../../globalFunctions'
import { apiBaseURL } from '../../config/serviceURLs.cfg'

const Dragger = Upload.Dragger;

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

// Properties:
//  - callback : callback to send filter value

class FileUpload extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
    this.onCustomRequest = this.onCustomRequest.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.readFileData = this.readFileData.bind(this)
    this.waitForFileRead = this.waitForFileRead.bind(this)

    this.state = {
      uploading: false,
      removing: false,
      fileList: [],
      fileData: ""
    }
  }

  async readFileData(file) {

    // Initialize an instance of the `FileReader`
    const reader = new FileReader()

    // Specify the handler for the `load` event
    reader.onload = (e) => {
      // Do something with the file
      // E.g. Send it to the cloud
      this.setState({ fileData: e.target.result })
    }

    // Read the file
    reader.readAsDataURL(file)

    //Wait for 'background' file read
    await this.waitForFileRead()

    //Get file data and reset state
    let fileData = this.state.fileData
    this.setState({ fileData: "" })

    return fileData
  }


  async waitForFileRead() {

    while (this.state.fileData === "") {
      await _gf.wait(250)
    }

    return true
  }

  async removeFile(file) {

    let { user } = this.props

    this.setState({ removing: true })

    //Remove
    try {
      let res = await fetch(apiBaseURL + "RemoveFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (user === null ? "" : user.access_token)
        },
        body: JSON.stringify({
          FileName: this.props.goalId,
          Base64Data: "",
          MimeType: file.type
        })
      })

      if (!res.ok) {
        //Get response body
        res = await res.json()
        throw new Error(res.error.message)
      }
    }
    catch (ex) {
      console.error(ex)
    }

    //Issue callback with result  
    let { callback } = this.props
    if (typeof callback !== 'undefined') {
      callback("")
    }

    this.setState({ removing: false })
  }

  async uploadFile(file) {

    let { user } = this.props
    this.setState({ uploading: true })

    let result = ""
    file.data = await this.readFileData(file)

    //Upload
    try {
      let res = await fetch(apiBaseURL + "UploadFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (user === null ? "" : user.access_token)
        },
        body: JSON.stringify({
          FileName: this.props.goalId,
          Base64Data: file.data,
          MimeType: file.type
        })
      })

      let resBody = await res.json()
      if (res.ok) {
        result = resBody
      }
      else {
        //Get response body
        throw new Error(resBody.error.message)
      }
    }
    catch (ex) {
      console.error(ex)
    }

    //Issue callback with result  
    let { callback } = this.props
    if (typeof callback !== 'undefined') {
      callback(result)
    }

    this.setState({ uploading: false })
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
    // if (status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    }
    else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
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
    let { fileList, uploading, removing } = this.state

    width = globalFunctions.fixEmptyValue(width, "315px")
    height = globalFunctions.fixEmptyValue(height, "90px")

    return (
      <div className="text-center"
        style={{
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
            marginBottom: fileList.length > 0 ? "12px" : "0px",
            minHeight: "100px"
          }}>
            <p className="ant-upload-drag-icon text-center" style={{ marginBottom: "3px" }}>
              <Icon type="to-top" theme="outlined" style={{ fontSize: "28px", marginTop: "8px", marginBottom: "5px" }} />
              <br />
              <span style={{ fontSize: "16px" }}>Click or drag file here to attach</span>
            </p>
          </div>
        </Dragger>

        {
          uploading &&
          <div style={{ marginTop: "5px" }}>
            <Icon type="loading" theme="outlined" />
            &nbsp;
            UPLOADING
          </div>
        }

        {
          removing &&
          <div style={{ marginTop: "5px" }}>
            <Icon type="loading" theme="outlined" />
            &nbsp;
            REMOVING
          </div>
        }

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)