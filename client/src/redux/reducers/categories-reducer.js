// CATEGORIES - REDUCER
// ==============================

// IMPORT FROM PACKAGES
const axios = require("axios");

// VARIABLES
const categoriesUrl = "/public/categories/?award_show_id="

// ACTION CREATORS
export let getCategories = (id) => {
    return dispatch => {
        dispatch({type: "RESET_LOADING_CATEGORY"})
        axios.get(categoriesUrl + id)
        .then(response => {
            dispatch (
                {
                    type: "GET_CATEGORIES",
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
let categories = (prevData = { loading: true, data: [] }, action ) => {
    switch(action.type) {
        case "RESET_LOADING_CATEGORY":
            return {
                ...prevData,
                loading: true
            };
        case "GET_CATEGORIES":
            return {
                loading: false,
                data: action.payload
            };
        default:
            return prevData
    }
}

// EXPORTS
export default categories