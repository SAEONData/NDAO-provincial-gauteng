let _apiBaseURL = ''
let _siteBaseURL = ''
let _ccrdBaseURL = ''
let _ccrdSiteBaseURL = ''
let _ndmcBaseURL = ''
let _ndmcSiteBaseURL = ''
let _vmsBaseURL = ''
let _ssoBaseURL = ''
let _metadataServiceURL = ''
let _mapServerBaseURL = ''

if (CONSTANTS.DEV) {
  _apiBaseURL = 'http://app01.saeon.ac.za/ccistestapi/odata/' //'https://localhost:44301/odata/'
  _siteBaseURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`
  _ccrdBaseURL = 'http://app01.saeon.ac.za/nccrdtestapi/odata/' //'http://localhost:62553/odata/'
  _ccrdSiteBaseURL = 'http://app01.saeon.ac.za/nccrdtestsite/#/' //'http://localhost:8085/#/'
  _ndmcBaseURL = 'http://app01.saeon.ac.za/ndmctestapi/odata/' //'https://localhost:44334/odata/'
  _ndmcSiteBaseURL = 'http://app01.saeon.ac.za/ndmctestsite/#/' //'http://localhost:8080/#/'
  _vmsBaseURL = 'http://app01.saeon.ac.za/vmstest/api/' //'http://localhost:64161/api/'
  _ssoBaseURL = 'https://identity.saeon.ac.za/' //'http://localhost:44320/'
  _metadataServiceURL = 'http://qa.dirisa.org/Institutions/dea-monitoring-and-evaluation/dea-monitoring-and-evaluation/metadata/jsonCreateMetadataAsJson/'
  _mapServerBaseURL = 'http://app01.saeon.ac.za'
}
else if (CONSTANTS.TEST) {
  _apiBaseURL = 'http://app01.saeon.ac.za/ccistestapi/odata/'
  _siteBaseURL = 'http://app01.saeon.ac.za/ccistestsite/'
  _ccrdBaseURL = 'http://app01.saeon.ac.za/nccrdtestapi/odata/'
  _ccrdSiteBaseURL = 'http://app01.saeon.ac.za/nccrdtestsite/#/'
  _ndmcBaseURL = 'http://app01.saeon.ac.za/ndmctestapi/odata/'
  _ndmcSiteBaseURL = 'http://app01.saeon.ac.za/ndmctestsite/#/'
  _vmsBaseURL = 'http://app01.saeon.ac.za/vmstest/api/'
  _ssoBaseURL = 'https://identity.saeon.ac.za/'
  _metadataServiceURL = 'http://qa.dirisa.org/Institutions/dea-monitoring-and-evaluation/dea-monitoring-and-evaluation/metadata/jsonCreateMetadataAsJson/'
  _mapServerBaseURL = 'http://app01.saeon.ac.za'
}
else if (CONSTANTS.PROD) {
  _apiBaseURL = 'http://app01.saeon.ac.za/ccisapi/odata/'
  _siteBaseURL = 'http://app01.saeon.ac.za/ccissite/'
  _ccrdBaseURL = 'http://app01.saeon.ac.za/nccrdapi/odata/'
  _ccrdSiteBaseURL = 'http://app01.saeon.ac.za/nccrdsite/#/'
  _ndmcBaseURL = 'http://app01.saeon.ac.za/ndmcapi/odata/'
  _ndmcSiteBaseURL = 'http://app01.saeon.ac.za/ndmcsite/#/'
  _vmsBaseURL = 'http://app01.saeon.ac.za/vms/api/'
  _ssoBaseURL = 'https://identity.saeon.ac.za/'
  _metadataServiceURL = 'http://qa.dirisa.org/Institutions/dea-monitoring-and-evaluation/dea-monitoring-and-evaluation/metadata/jsonCreateMetadataAsJson/'
  _mapServerBaseURL = 'http://app01.saeon.ac.za'
}

export const apiBaseURL = _apiBaseURL
export const siteBaseURL = _siteBaseURL
export const ccrdBaseURL = _ccrdBaseURL
export const ccrdSiteBaseURL = _ccrdSiteBaseURL
export const ndmcBaseURL = _ndmcBaseURL
export const ndmcSiteBaseURL = _ndmcSiteBaseURL
export const vmsBaseURL = _vmsBaseURL
export const ssoBaseURL = _ssoBaseURL
export const metadataServiceURL = _metadataServiceURL
export const mapServerBaseURL = _mapServerBaseURL