// BALLOTS REDUCER
// ==============================

// IMPORT FROM PACKAGES
const axios = require("axios");

// VARIABLES
const getBallotsUrl = "/api/ballots?awards_id=";
const getBallotUrl = "/api/ballots?category_id=";
const ballotsUrl = "/api/ballots/";

// MIDDLEWARE
let ballotsAxios = axios.create();

// APPLY MIDDLEWARE
ballotsAxios.interceptors.request.use(((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`
    return config;
})) 

/////////////////////
// ACTION CREATORS //
/////////////////////

// GET BALLOTS
export const getBallots = (awardId) => {
    return dispatch => {
        dispatch({ type: "RESET_LOADING_BALLOTS" })
        ballotsAxios.get(getBallotsUrl + awardId)
            .then(response => {
                dispatch(
                    {
                        type: "GET_BALLOTS",
                        payload: response.data
                    }
                )
            })
            .catch(err => {
                console.error(err)
            })
    }
}

// GET BALLOT
export const getBallot = (categoryId) => {
    return dispatch => {
        dispatch({ type: "RESET_LOADING_BALLOT" });
        ballotsAxios.get(getBallotUrl + categoryId)
            .then(response => {
                let data = response.data[0]
                if (data === undefined) {
                    data = null
                }
                dispatch(
                    {
                        type: "GET_BALLOT",
                        payload: data
                    }
                )
            })
            .catch(err => {
                console.error(err)
            })
    }
}

// POST BALLOT
export const postBallot = (ballot) => {
    return dispatch => {
        ballotsAxios.post(ballotsUrl, ballot)
            .then((response) => {
                dispatch(
                    {
                        type: "POST_BALLOT",
                        payload: response.data
                    }
                )
            })
            .catch(err => {
                console.error(err)
            })
    }
}

// PUT BALLOT
export const updateBallot = (ballot, id) => {
    console.log("update ballot called")
    return dispatch => {
        ballotsAxios.put(ballotsUrl + id, ballot)
            .then((response) => {
                console.log("dirty shit")
                dispatch({
                    type: "UPDATE_BALLOT",
                    payload: response.data,
                    id
                })
            })
    }
}

// DELETE BALLOT
// to add later
// {
//     predicted: "",
//     }

//////////////
// REDUCER //
//////////////

const ballots = (prevData = { loadingMany: true, loadingSingle: true, data: [], currentBallot: {} }, action) => {
    switch (action.type) {
        case "RESET_LOADING_BALLOT":
            return {
                ...prevData,
                loadingSingle: true
            };
        case "RESET_LOADING_BALLOTS":
            return {
                ...prevData,
                data: [],
                loadingMany: true
            };
        case "GET_BALLOTS":
            return {
                ...prevData,
                loadingMany: false,
                data: action.payload
            };
        case "GET_BALLOT":
            return {
                ...prevData,
                loadingSingle: false,
                currentBallot: action.payload
            };
        case "POST_BALLOT":
            return {
                loadingSingle: false,
                currentBallot: action.payload,
                data: [...prevData.data, action.payload]
            };
        case "UPDATE_BALLOT":
            return {
                loading: false,
                currentBallot: action.payload,
                data: prevData.data.map((ballot) => {
                    if (ballot._id === action.id) {
                        return action.payload
                    } else {
                        return ballot
                    }
                })
            }
        case "LOGOUT":
            return {
                loadingMany: true, 
                loadingSingle: true,
                data: [],
                currentBallot: {}
            }
        default:
            return prevData
    }
}

// EXPORTS
export default ballots