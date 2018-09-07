import { createUserManager } from 'redux-oidc';
import { userManagerConfig } from '../../secrets.cfg'

const userManager = createUserManager(userManagerConfig);

export default userManager;