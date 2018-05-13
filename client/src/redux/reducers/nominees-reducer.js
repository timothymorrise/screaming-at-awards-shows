// NOMINEES - REDUCER
// ==============================

// IMPORT FROM PACKAGES
const axios = require("axios");

// VARIABLES
const nomineesByCatUrl = "/public/nominees/?category_id="
const nomineesUrl = "/public/nominees/"
// ACTION CREATORS
export let getNominees = () => {
    return dispatch => {
        dispatch({type: "RESET_LOADING_NOMINEE"})
        axios.get(nomineesUrl)
        .then(response => {
            dispatch(
                {
                    type: "GET_NOMINEES",
                    payload: response.data
                }
            )
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export let getSomeNominees = (id) => {
    return dispatch => { 
        axios.get(nomineesByCatUrl + id)
        .then(response => {
            dispatch(
                {
                    type: "GET_SOME_NOMINEES",
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
let nominees = (prevData = { loading: true, someLoading: true, data: [], ballotData: [] }, action ) => {
    switch(action.type) {
        case "RESET_LOADING_NOMINEE":
            return {
                ...prevData,
                loading: true
            }
        case "GET_SOME_NOMINEES":
            return {
                ...prevData,
                someLoading: false,
                ballotData: [...action.payload]
            };
        case "GET_NOMINEES":
            return {
                ...prevData,
                loading: false,
                data: [...action.payload]
            }
        default: 
            return prevData
    }
}

// EXPORTS
export default nominees