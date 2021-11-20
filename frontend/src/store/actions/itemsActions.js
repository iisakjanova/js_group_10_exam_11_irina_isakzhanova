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

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

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

export const deleteItemRequest = () => ({type: DELETE_ITEM_REQUEST});
export const deleteItemSuccess = () => ({type: DELETE_ITEM_SUCCESS});
export const deleteItemFailure = error => ({type: DELETE_ITEM_FAILURE, payload: error});


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

export const deleteItem = (id) => {
    return async (dispatch, getState) => {
        const headers = {
            'Authorization': getState().users.user && getState().users.user.token
        };

        try {
            dispatch(deleteItemRequest());
            await axiosApi.delete('/items/' + id, {headers});
            dispatch(deleteItemSuccess());
            toast.success('Item deleted');
            dispatch(historyReplace('/'));
        } catch (error) {
            dispatch(deleteItemFailure(error.message));
            if (error.response && error.response.data) {
                dispatch(deleteItemFailure(error.response.data));
                toast.error('Could not delete item!', {
                    theme: 'colored',
                });
            } else {
                dispatch(deleteItemFailure({global: 'No internet'}));
                toast.error('No internet', {
                    theme: 'colored',
                });
            }
        }
    };
};