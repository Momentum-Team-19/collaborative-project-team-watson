// AuthContext.js

import { createContext } from 'react';

const AuthContext = createContext({
    token: null,
    setToken: () => {},
    loggedInUser: null,
    setLoggedInUser: () => {}
});

export default AuthContext;
