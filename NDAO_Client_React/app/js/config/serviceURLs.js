let _apiBaseURL = ''
let _siteBaseURL = ''
let _ccrdBaseURL = ''
let _ccrdSiteBaseURL = ''
let _nccisSiteBaseURL = ''
let _ndmcBaseURL = ''
let _ndmcSiteBaseURL = ''
let _vmsBaseURL = ''
let _ssoBaseURL = ''
let _metadataServiceURL = ''
let _mapServerBaseURL = ''

if (CONSTANTS.DEV) {
  _apiBaseURL = 'https://ccis.environment.gov.za/ndao/api/odata/' //'https://localhost:44301/odata/' //'http://app01.saeon.ac.za/ndaotestapi/odata/'
  _siteBaseURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`
  _ccrdBaseURL = 'http://app01.saeon.ac.za/nccrdtestapi/odata/' //'http://localhost:62553/odata/'
  _ccrdSiteBaseURL = 'http://app01.saeon.ac.za/nccrdtestsite/#/' //'http://localhost:8085/#/'
  _nccisSiteBaseURL = 'https://ccis.environment.gov.za/' //'http://app01.saeon.ac.za/nccistestsite'
  _ndmcBaseURL = 'http://app01.saeon.ac.za/ndmctestapi/odata/' //'https://localhost:44334/odata/'
  _ndmcSiteBaseURL = 'http://app01.saeon.ac.za/ndmctestsite/#/' //'http://localhost:8080/#/'
  _vmsBaseURL = 'http://app01.saeon.ac.za/vmstest/api/' //'http://localhost:64161/api/'
  _ssoBaseURL = 'https://identity.saeon.ac.za/' //'http://localhost:44320/'
  _metadataServiceURL = 'https://qad.saeoss.org/Institutions/dea-monitoring-and-evaluation/dea-monitoring-and-evaluation/metadata/jsonCreateMetadataAsJson/'
  _mapServerBaseURL = 'https://ccis.environment.gov.za/map'
}
else if (CONSTANTS.TEST) {
  _apiBaseURL = 'http://app01.saeon.ac.za/ndaotestapi/odata/'
  _siteBaseURL = 'http://app01.saeon.ac.za/ndaotestsite/'
  _ccrdBaseURL = 'http://app01.saeon.ac.za/nccrdtestapi/odata/'
  _ccrdSiteBaseURL = 'http://app01.saeon.ac.za/nccrdtestsite/#/'
  _nccisSiteBaseURL = 'http://app01.saeon.ac.za/nccistestsite'
  _ndmcBaseURL = 'http://app01.saeon.ac.za/ndmctestapi/odata/'
  _ndmcSiteBaseURL = 'http://app01.saeon.ac.za/ndmctestsite/#/'
  _vmsBaseURL = 'http://app01.saeon.ac.za/vmstest/api/'
  _ssoBaseURL = 'https://identity.saeon.ac.za/'
  _metadataServiceURL = 'https://qad.saeoss.org/Institutions/dea-monitoring-and-evaluation/dea-monitoring-and-evaluation/metadata/jsonCreateMetadataAsJson/'
  _mapServerBaseURL = 'http://app01.saeon.ac.za'
}
else if (CONSTANTS.PROD) {
  _apiBaseURL = 'https://ccis.environment.gov.za/ndao/api/odata/';
  _siteBaseURL = 'https://ccis.environment.gov.za/ndao/';
  _ccrdBaseURL = 'https://ccis.environment.gov.za/nccrd/api/odata/';
  _ccrdSiteBaseURL = 'https://ccis.environment.gov.za/nccrd/';
  _nccisSiteBaseURL = 'https://ccis.environment.gov.za/'
  _ndmcBaseURL = 'https://ccis.environment.gov.za/nhe/api/odata/';
  _ndmcSiteBaseURL = 'https://ccis.environment.gov.za/nhe/';
  _vmsBaseURL = 'https://ccis.environment.gov.za/vms/api/';
  _ssoBaseURL = 'https://identity.saeon.ac.za/';
  _metadataServiceURL = 'https://qad.saeoss.org/Institutions/dea-monitoring-and-evaluation/dea-monitoring-and-evaluation/metadata/jsonCreateMetadataAsJson/';
  _mapServerBaseURL = 'https://ccis.environment.gov.za/map';
}

export const apiBaseURL = _apiBaseURL
export const siteBaseURL = _siteBaseURL
export const ccrdBaseURL = _ccrdBaseURL
export const ccrdSiteBaseURL = _ccrdSiteBaseURL
export const nccisSiteBaseURL = _nccisSiteBaseURL
export const ndmcBaseURL = _ndmcBaseURL
export const ndmcSiteBaseURL = _ndmcSiteBaseURL
export const vmsBaseURL = _vmsBaseURL
export const ssoBaseURL = _ssoBaseURL
export const metadataServiceURL = _metadataServiceURL
export const mapServerBaseURL = _mapServerBaseURL