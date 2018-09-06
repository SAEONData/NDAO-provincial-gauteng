'use strict'

import { ssoBaseURL } from './config/ssoBaseURL'
import { siteBaseURL } from './config/siteBaseURL'

let config = {
  client_id: 'NCCME_Client',
  redirect_uri: `${siteBaseURL}#/callback#`,
  post_logout_redirect_uri: `${siteBaseURL}#/logout`,
  silent_redirect_uri: `${siteBaseURL}silent_renew.html`,
  response_type: 'id_token token',
  scope: 'openid profile email',
  authority: ssoBaseURL,
  automaticSilentRenew: true,
  filterProtocolClaims: false,
  loadUserInfo: true,
  silentRequestTimeout: 30000
}

export const userManagerConfig = config