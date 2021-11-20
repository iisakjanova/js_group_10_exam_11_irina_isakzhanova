import {
    ADD_ITEM_FAILURE,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    CLEAN_UP_ITEM_ERROR,
    GET_ITEMS_FAILURE,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS
} from "../actions/itemsActions";

const initialState = {
    items: [],
    item: null,
    addLoading: false,
    addError: null,
    fetchLoading: false,
    fetchError: null,
    singleLoading: false,
    singleError: null,
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_REQUEST:
            return {...state, addLoading: true};
        case ADD_ITEM_SUCCESS:
            return {...state, addLoading: false, addError: null};
        case ADD_ITEM_FAILURE:
            return {...state, addLoading: false, addError: action.payload};
        case CLEAN_UP_ITEM_ERROR:
            return {...state, addError: null};
        case GET_ITEMS_REQUEST:
            return {...state, fetchLoading: true};
        case GET_ITEMS_SUCCESS:
            return {...state, fetchLoading: false, items: action.payload, fetchError: null};
        case GET_ITEMS_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};
        default:
            return state;
    }
};

export default itemsReducer;