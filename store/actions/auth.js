import config from '../../config/core';
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    //console.log(actionTypes.AUTH_START);
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    //console.log(actionTypes.AUTH_SUCCESS);
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: data
    };
};

export const authFail = (error) => {
    //console.log(actionTypes.AUTH_FAIL);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (exp) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, exp * 1000);
    };
};

export const auth = (email, password, success = _ => {}, error = _ => {}) => {
    return dispatch => {
        dispatch(authStart());

        let url = config.backend + '/usuarios/login';

        axios.post(url, {
            correo: email,
            password: password,
        }).then(response => {
            //console.log('store/actions/auth.js auth() axios.post() then response', response.data.data);
            //axios.defaults.headers.common['access-token'] = response.data.data.token; // for all requests
            //console.log('store/actions/auth.js auth() axios.post() then axios', axios.defaults.headers);
            //console.log('store/actions/auth.js auth() axios.post() response', response.data.data);

            if(!response.data.success) {
                dispatch(authFail(response.data.msg));
                error();
            }
            else {
                dispatch(authSuccess(response.data.data));
                //dispatch(checkAuthTimeout(response.data.expiresIn));
                success();
            }
            
        }).catch(err => {
            dispatch(authFail(err));
        });
    };
};

export const clearError = () => {
    return dispatch => {
        dispatch();
    }
}