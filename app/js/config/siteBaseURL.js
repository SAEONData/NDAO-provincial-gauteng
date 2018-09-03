let url

if(CONSTANTS.PRODUCTION) {
    url = 'http://app01.saeon.ac.za/nccrdsite/'
} else {
    url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/` //http://localhost:8080/
}

export const siteBaseURL = url