import {
    GET_CATEGORIES_FAILURE,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
    categories: [],
    fetchLoading: false,
    fetchError: null,
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return {...state, fetchLoading: true};
        case GET_CATEGORIES_SUCCESS:
            return {...state, fetchLoading: false, categories: action.payload, fetchError: null};
        case GET_CATEGORIES_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};
        default:
            return state;
    }
};

export default categoriesReducer;