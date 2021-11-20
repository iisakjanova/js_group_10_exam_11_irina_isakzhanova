import {historyReplace} from "./historyActions";
import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const CLEAN_UP_ITEM_ERROR = 'CLEAN_UP_ITEM_ERROR';

export const addItemRequest = () => ({type: ADD_ITEM_REQUEST});
export const addItemSuccess = () => ({type: ADD_ITEM_SUCCESS});
export const addItemFailure = error => ({type: ADD_ITEM_FAILURE, payload: error});

export const cleanUpItemError = () => ({type: CLEAN_UP_ITEM_ERROR});

export const addItem = (data) => {
    return async (dispatch, getState) => {
        const headers = {
            'Authorization': getState().users.user && getState().users.user.token
        };

        try {
            dispatch(addItemRequest());
            await axiosApi.post('/items', data, {headers});
            dispatch(addItemSuccess());
            toast.success('Item created');
            dispatch(historyReplace('/'));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(addItemFailure(error.response.data));
            } else {
                dispatch(addItemFailure({global: 'No internet'}));
            }
        }
    };
};