let url

if(CONSTANTS.PRODUCTION) {
    url = 'http://server_url/'
} else {
    url = 'http://localhost:8888/'
}

export const apiBaseURL = url
