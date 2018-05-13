// AUTH - REDUCER
// ==============================

// IMPORT FROM PACKAGES
const axios = require("axios");

// VARIABLES
const signupUrl = "/auth/signup"
const loginUrl = "/auth/signup"

// ACTION CREATORS
export const signup = userInfo => {
    return dispatch => {
        axios.post(authUrl, userInfo)
        .then(response => {
            const {token, user} = response.data
            localStorage.token = token;
            localStorage.user = JSON.stringify(user)
            dispatch(authenticate(user));
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export const authenticate = user => {type: "AUTHENTICATE", user}

export const login = credentials => {
    return dispatch => {
        axios.post()
    }
}

// REDUCERS
const initialState = {
    username: "",
    isAdmin: false,
    isAuthenticated: false
}

const user = (state = initialState, action) => {
    switch(action.type) {
        case "AUTHENTICATE":
            return  {
                ...state,
                ...action.user,
                isAuthenticated: true 
            }
        
        default: 
            return state
    }
} 

