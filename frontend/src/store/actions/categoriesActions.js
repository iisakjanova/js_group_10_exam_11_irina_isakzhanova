import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export const getCategoriesRequest = () => ({type: GET_CATEGORIES_REQUEST});
export const getCategoriesSuccess = data => ({type: GET_CATEGORIES_SUCCESS, payload: data});
export const getCategoriesFailure = error => ({type: GET_CATEGORIES_FAILURE, payload: error});

export const getCategories = () => {
    return async dispatch => {
        try {
            dispatch(getCategoriesRequest());
            const response = await axiosApi.get('/categories');
            dispatch(getCategoriesSuccess(response.data));
        } catch (error) {
            dispatch(getCategoriesFailure(error.message));
            toast.error('Could not fetch categories!', {
                theme: 'colored',
            });
        }
    };
};