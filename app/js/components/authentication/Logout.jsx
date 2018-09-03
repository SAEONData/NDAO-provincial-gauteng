'use strict'

import React from 'react'
import userManager from '../Authentication/userManager'

class Logout extends React.Component {

    componentDidMount() {
        userManager.signoutRedirect();
    }

    render() {

        return (
            <>    
                <div>
                    <br />
                    <label>&nbsp;Logging out...</label>
                </div>
            </>
        )
    }
}

export default Logout