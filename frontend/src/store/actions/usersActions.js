import axiosApi from "../../axiosApi";
import {historyReplace} from "./historyActions";
import {toast} from "react-toastify";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const CLEAN_UP_ERROR = 'CLEAN_UP_ERROR';

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, payload: user});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});

export const cleanUpError = () => ({type: CLEAN_UP_ERROR});

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());
            const response = await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess(response.data));
            dispatch(historyReplace('/'));
            toast.success('Registration is successful');
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(registerUserFailure(error.response.data));
            } else {
                if (error.response && error.response.data) {
                    dispatch(registerUserFailure(error.response.data));
                } else {
                    dispatch(registerUserFailure({global: 'No internet'}));
                }
            }
        }
    };
};

export const loginUser = (userData, historyLocationState) => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data.user));

            if (historyLocationState && historyLocationState.nextpath) {
                dispatch(historyReplace(historyLocationState.nextpath));
            } else {
                dispatch(historyReplace('/'));
            }

            toast.success('Login successful');
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(loginUserFailure(error.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet'}));
            }
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        await axiosApi.delete('/users/sessions');
        dispatch({type: LOGOUT_USER});
        dispatch(historyReplace('/'));
    };
};