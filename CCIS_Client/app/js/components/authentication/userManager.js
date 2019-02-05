import { createUserManager } from 'redux-oidc';
import { userManagerConfig } from '../../secrets.js'

const userManager = createUserManager(userManagerConfig);

export default userManager;