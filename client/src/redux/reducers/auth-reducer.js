// AUTH - REDUCER
// ==============================

// IMPORT FROM PACKAGES
const axios = require("axios");

// VARIABLES
const signupUrl = "/auth/signup"
const loginUrl = "/auth/login"

/////////////////////
// ACTION CREATORS //
/////////////////////

export const signup = userInfo => {
    return dispatch => {
        axios.post(signupUrl, userInfo)
        .then(response => {
            const {token, user} = response.data
            localStorage.token = token;
            localStorage.user = JSON.stringify(user)
            dispatch(authenticate(user));
        })
        .catch(err => {
            console.error(err)
            dispatch(authError("signup", err.response.status))
        })
    }
}

export const login = credentials => {
    return dispatch => {
        axios.post(loginUrl, credentials)
        .then(response => {
            const {token, user} = response.data;
            localStorage.token = token
            localStorage.user = JSON.stringify(user);
            dispatch(authenticate(user));
        })
        .catch((err) => {
            console.error(err);
            dispatch(authError("login", err.response.status))
        });
    }
}

export const authenticate = user => {
    return {
        type: "AUTHENTICATE", 
        user}
}

export const logout = () => {
    delete localStorage.token;
    delete localStorage.user;
    return {
        type: "LOGOUT"
    }
}

export const authError = (key, errCode) => {
    return {
        type: "AUTH_ERROR",
        key, 
        errCode
    }
}

/////////////
// REDUCER //
/////////////

const initialState = {
    user: {
        username: "",
        admin: false,
        _id: ""
    },
    authErrCode: {
        signup: "",
        login: ""
    },
    isAuthenticated: false
}

const auth = (state = initialState, action) => {
    switch(action.type) {
        case "AUTHENTICATE":
            return  {
                ...state,
                user: action.user,
                isAuthenticated: true,
                authErrCode: initialState.authErrCode
            };
        case "LOGOUT":
            return initialState;
        case "AUTH_ERROR":
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                }
            };
        default:
            return state
    }
} 

//EXPORTS

export default auth
