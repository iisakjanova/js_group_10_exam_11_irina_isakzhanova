import {
    CLEAN_UP_ERROR,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
    user: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, registerLoading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, user: action.payload, registerLoading: false, registerError: null};
        case REGISTER_USER_FAILURE:
            return {...state, registerLoading: false, registerError: action.payload};
        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true}
        case LOGIN_USER_SUCCESS:
            return {...state, loginLoading: false, loginError: null, user: action.payload};
        case LOGIN_USER_FAILURE:
            return {...state, loginLoading: false, loginError: action.payload};
        case CLEAN_UP_ERROR:
            return {...state, loginError: null, registerError: null};
        case LOGOUT_USER:
            return {...state, user: null};
        default:
            return state;
    }
};

export default usersReducer;