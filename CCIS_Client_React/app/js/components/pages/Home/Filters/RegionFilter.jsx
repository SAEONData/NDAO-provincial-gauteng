import React from 'react'
import { Row, Col } from 'mdbreact'
import TreeSelectInput from '../../../input/TreeSelectInput.jsx';
import { vmsBaseURL } from '../../../../../js/config/serviceURLs.js'
import OData from 'react-odata'

const _gf = require('../../../../globalFunctions')


class RegionFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { value, callback } = this.props

    return (
      <>
        <OData
          baseUrl={vmsBaseURL + 'Regions'}>

          {({ loading, error, data }) => {

            let processedData = []

            if (loading) {
              processedData = [{ id: "Loading...", value: "Loading..." }]
            }

            if (error) {
              console.error(error)
            }

            if (data) {
              if (data.items && data.items.length > 0) {
                processedData = data.items
              }
            }

            return (
              <TreeSelectInput
                data={processedData}
                transform={(item) => { return { id: item.id, text: item.value, children: item.children } }}
                value={value}
                allowClear={true}
                callback={(value) => {
                  callback(value.id)
                }}
                placeHolder={"Region  (National)"}
              />
            )
          }}
        </OData>
      </>
    )
  }
}

export default RegionFilter