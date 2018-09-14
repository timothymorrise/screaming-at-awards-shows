// AUTH - REDUCER
// ==============================

// IMPORT FROM PACKAGES
const axios = require("axios");

// VARIABLES
const signupUrl = "/auth/signup"
const loginUrl = "/auth/login"

///////////
// AXIOS //
///////////

const profileAxios = axios.create();
profileAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

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

export const verify = () => {
    return dispatch => {
        profileAxios.get("/api/profile")
        .then(response => {
            let { user } = response.data;
            dispatch(authenticate(user));
        })
        .catch(err => {
            dispatch(authError("verify", err.response.status));
        })
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
    isAuthenticated: false,
    loading: true
}

const auth = (state = initialState, action) => {
    switch(action.type) {
        case "AUTHENTICATE":
            return  {
                ...state,
                user: action.user,
                isAuthenticated: true,
                authErrCode: initialState.authErrCode,
                loading: false
            };
        case "LOGOUT":
            return {
                ...initialState,
                loading: false
            };
        case "AUTH_ERROR":
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                },
                loading: false
            };
        default:
            return state
    }
} 

//EXPORTS

export default auth
