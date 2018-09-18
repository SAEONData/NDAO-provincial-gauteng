import React from "react";
import { CallbackComponent } from "redux-oidc";
import userManager from '../Authentication/userManager'

class CallbackPage extends React.Component {

    constructor(props) {
        super(props);

        this.successCallbackHandler = this.successCallbackHandler.bind(this);
        this.errorCallbackHandler = this.errorCallbackHandler.bind(this);
    }

    successCallbackHandler(user) {
        location = "#"
    }

    errorCallbackHandler(e) {
        console.log("Login failed!!", e)
        location = "#"
    }

    render() {

        return (
            <CallbackComponent
                userManager={userManager}
                successCallback={this.successCallbackHandler}
                errorCallback={this.errorCallbackHandler}
            >
                <div>
                    <br />
                    <label>&nbsp;Redirecting...</label>
                </div>

            </CallbackComponent>
        );
    }
}

export default CallbackPage
