let url

if(CONSTANTS.PRODUCTION) {
    url = 'http://identity.saeon.ac.za/'
} else {
    url = 'http://localhost:44320/'
}

export const ssoBaseURL = url
