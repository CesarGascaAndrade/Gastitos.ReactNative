import * as actionTypes from '../actions/actionTypes';
import { updateObject, session } from '../utility';

let initialState = {
    registros: [],
    selected: null,
    loading: false,
    error: null
};

session.getData('registros').then(data => {
    initialState.registros = data;
});

// REGISTRO CREAR
const registroCrearStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const registroCrearSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
}

const registroCrearFail = (state, action) => {
    //console.log('store/reducers/registro.js registroFail() action.error', action.error);
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

// REGISTRO CONSULTAR
const registroConsultarStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const registroConsultarSuccess = (state, action) => {
    session.setData('registros', action.data);

    return updateObject(state, {
        registros: action.data,
        error: null,
        loading: false
    });
}

const registroConsultarFail = (state, action) => {
    //console.log('store/reducers/registro.js registroFail() action.error', action.error);
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

// REGISTRO EDITAR
const registroEditarStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const registroEditarSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
}

const registroEditarFail = (state, action) => {
    //console.log('store/reducers/registro.js registroFail() action.error', action.error);
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

// REGISTRO ELIMINAR
const registroEliminarStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const registroEliminarSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
}

const registroEliminarFail = (state, action) => {
    //console.log('store/reducers/registro.js registroFail() action.error', action.error);
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTRO_CREAR_START: return registroCrearStart(state, action);
        case actionTypes.REGISTRO_CREAR_SUCCESS: return registroCrearSuccess(state, action);
        case actionTypes.REGISTRO_CREAR_FAIL: return registroCrearFail(state, action);
        
        case actionTypes.REGISTRO_CONSULTAR_START: return registroConsultarStart(state, action);
        case actionTypes.REGISTRO_CONSULTAR_SUCCESS: return registroConsultarSuccess(state, action);
        case actionTypes.REGISTRO_CONSULTAR_FAIL: return registroConsultarFail(state, action);
        
        case actionTypes.REGISTRO_EDITAR_START: return registroEditarStart(state, action);
        case actionTypes.REGISTRO_EDITAR_SUCCESS: return registroEditarSuccess(state, action);
        case actionTypes.REGISTRO_EDITAR_FAIL: return registroEditarFail(state, action);
        
        case actionTypes.REGISTRO_ELIMINAR_START: return registroEliminarStart(state, action);
        case actionTypes.REGISTRO_ELIMINAR_SUCCESS: return registroEliminarSuccess(state, action);
        case actionTypes.REGISTRO_ELIMINAR_FAIL: return registroEliminarFail(state, action);
        
        default: return state;
    }
}

export default reducer;