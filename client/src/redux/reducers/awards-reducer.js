// AWARDS - REDUCER
// ==============================

// IMPORT FROM PACKAGES
const axios = require("axios");

// VARIABLES
const awardsUrl = "/public/awards"

// ACTION CREATORS
export const getAwards = () => {
    return dispatch => {
        dispatch({type: "RESET_LOADING_AWARDS"})
        axios.get(awardsUrl)
        .then(response => {
            dispatch (
                {
                    type: "GET_AWARDS",
                    payload: response.data
                }
            )
        })
        .catch(err => {
            console.error(err)
        })
    }
}

// REDUCER FUNCTIONS
const awards = (prevData = { loading: true, data: [] }, action ) => {
    switch(action.type) {
        case "RESET_LOADING_AWARDS":
            return {
                ...prevData,
                loading: true
            };
        case "GET_AWARDS":
            return {
                loading: false,
                data: [...action.payload]
            };
        default:
            return prevData
    }
    
}

// EXPORTS
export default awards