import * as actionTypes from '../actions/actionTypes';
import { updateObject, session } from '../utility';

let initialState = {
    usuario: null,
    token: null,
    error: null,
    loading: false,
};

session.getData('usuario').then( data => {
    initialState = data;
});

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    session.setData('access-token', action.data.token);
    session.setData('usuario', action.data.usuario);

    return updateObject(state, {
        usuario: action.data.usuario,
        token: action.data.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    //console.log('store/reducers/auth.js authFail() action.error', action.error);
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    
    session.clear();

    return updateObject(state, {
        usuario: null,
        error: null,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}

export default reducer;