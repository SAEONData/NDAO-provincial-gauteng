import React from 'react'
import { Row, Col } from 'mdbreact'
import TreeSelectInput from '../../../input/TreeSelectInput.jsx';
import OData from 'react-odata'

class InstitutionFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { data, value, callback } = this.props

    return (
      <>
        <TreeSelectInput
              data={data}
              transform={(item) => { return { id: item, text: item } }}
              value={value}
              allowClear={true}
              callback={(value) => { callback(value) }}
              placeHolder={"Organisation/Institution  (Government)"}
            />
      </>
    )
  }
}

export default InstitutionFilter