'use strict'

import React from 'react'
import userManager from '../Authentication/userManager'

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        userManager.signinRedirect()
    }

    render() {

        return (
            <> 
                <div>
                    <br />
                    <label>&nbsp;Redirecting...</label>
                </div>
            </>
        )
    }
}

export default Login