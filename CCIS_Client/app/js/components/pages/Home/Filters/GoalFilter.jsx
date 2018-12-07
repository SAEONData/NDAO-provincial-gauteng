import React from 'react'
import SelectInput from '../../../input/SelectInput.jsx';


class SectorFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { value, callback } = this.props

    const data = [
      { id: 1, text: "Goal-1" },
      { id: 2, text: "Goal-2" },
      { id: 3, text: "Goal-3" },
      { id: 4, text: "Goal-4" },
      { id: 5, text: "Goal-5" },
      { id: 6, text: "Goal-6" },
      { id: 7, text: "Goal-7" },
      { id: 8, text: "Goal-8" },
      { id: 9, text: "Goal-9" },
    ]

    //Get current value
    let f = data.filter(x => x.id == value)
    if (f && f.length > 0 && f[0].text) {
      value = f[0].text
    }

    if(value === 0) value = undefined

    return (
      <>
        <SelectInput
          placeHolder="Goal  (Any)"
          value={value}
          data={data}
          callback={(value) => {
            callback(value.id)
          }}
          allowClear={false}
        />
      </>
    )
  }
}

export default SectorFilter