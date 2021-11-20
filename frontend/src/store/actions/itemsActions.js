import {historyReplace} from "./historyActions";
import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const CLEAN_UP_ITEM_ERROR = 'CLEAN_UP_ITEM_ERROR';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEMS_FAILURE';

export const GET_ITEM_BY_ID_REQUEST = 'GET_ITEM_BY_ID_REQUEST';
export const GET_ITEM_BY_ID_SUCCESS = 'GET_ITEM_BY_ID_SUCCESS';
export const GET_ITEM_BY_ID_FAILURE = 'GET_ITEM_BY_ID_FAILURE';

export const addItemRequest = () => ({type: ADD_ITEM_REQUEST});
export const addItemSuccess = () => ({type: ADD_ITEM_SUCCESS});
export const addItemFailure = error => ({type: ADD_ITEM_FAILURE, payload: error});

export const cleanUpItemError = () => ({type: CLEAN_UP_ITEM_ERROR});

export const getItemsRequest = () => ({type: GET_ITEMS_REQUEST});
export const getItemsSuccess = data => ({type: GET_ITEMS_SUCCESS, payload: data});
export const getItemsFailure = error => ({type: GET_ITEMS_FAILURE, payload: error});

export const getItemByIdRequest = () => ({type: GET_ITEM_BY_ID_REQUEST});
export const getItemByIdSuccess = data => ({type: GET_ITEM_BY_ID_SUCCESS, payload: data});
export const getItemByIdFailure = error => ({type: GET_ITEM_BY_ID_FAILURE, payload: error});

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

export const getItems = (id) => {
    return async dispatch => {
        try {
            dispatch(getItemsRequest());

            let query = '';

            if (id) {
                query = `?category=${id}`
            }

            const response = await axiosApi.get(`/items${query}`);
            dispatch(getItemsSuccess(response.data));
        } catch (error) {
            dispatch(getItemsFailure(error.message));
            toast.error('Could not fetch items!', {
                theme: 'colored',
            });
        }
    };
};

export const getItemById = (id) => {
    return async dispatch => {
        try {
            dispatch(getItemByIdRequest());
            const response = await axiosApi.get('/items/' + id);
            dispatch(getItemByIdSuccess(response.data));
        } catch (error) {
            dispatch(getItemByIdFailure(error.message));
            toast.error('Could not fetch item!', {
                theme: 'colored',
            });
        }
    };
};