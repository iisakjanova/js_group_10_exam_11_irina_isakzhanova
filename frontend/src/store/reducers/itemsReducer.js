import {
    ADD_ITEM_FAILURE,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    CLEAN_UP_ITEM_ERROR
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
        default:
            return state;
    }
};

export default itemsReducer;