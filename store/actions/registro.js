import config from '../../config/core';
import * as actionTypes from './actionTypes';
import axios from 'axios';

import { session } from '../utility';



// REGISTRO CREAR
export const registroCrearStart = () => {
    console.log(actionTypes.REGISTRO_CREAR_START);
    return {
        type: actionTypes.REGISTRO_CREAR_START
    };
};

export const registroCrearSuccess = (data) => {
    console.log(actionTypes.REGISTRO_CREAR_SUCCESS);
    return {
        type: actionTypes.REGISTRO_CREAR_SUCCESS,
        data: data
    };
};

export const registroCrearFail = (error) => {
    console.log(actionTypes.REGISTRO_CREAR_FAIL, error);
    return {
        type: actionTypes.REGISTRO_CREAR_FAIL,
        error: error
    };
};

// REGISTRO CONSULTAR
export const registroConsultarStart = () => {
    //console.log(actionTypes.REGISTRO_CONSULTAR_START);
    return {
        type: actionTypes.REGISTRO_CONSULTAR_START
    };
};

export const registroConsultarSuccess = (data) => {
    //console.log(actionTypes.REGISTRO_CONSULTAR_SUCCESS);
    return {
        type: actionTypes.REGISTRO_CONSULTAR_SUCCESS,
        data: data
    };
};

export const registroConsultarFail = (error) => {
    //console.log(actionTypes.REGISTRO_CONSULTAR_FAIL);
    return {
        type: actionTypes.REGISTRO_CONSULTAR_FAIL,
        error: error
    };
};

// REGISTRO EDITAR
export const registroEditarStart = () => {
    console.log(actionTypes.REGISTRO_EDITAR_START);
    return {
        type: actionTypes.REGISTRO_EDITAR_START
    };
};

export const registroEditarSuccess = () => {
    console.log(actionTypes.REGISTRO_EDITAR_SUCCESS);
    return {
        type: actionTypes.REGISTRO_EDITAR_SUCCESS,
    };
};

export const registroEditarFail = (error) => {
    console.log(actionTypes.REGISTRO_EDITAR_FAIL, error);
    return {
        type: actionTypes.REGISTRO_EDITAR_FAIL,
        error: error
    };
};

// REGISTRO ELIMINAR
export const registroEliminarStart = () => {
    //console.log(actionTypes.REGISTRO_ELIMINAR_START);
    return {
        type: actionTypes.REGISTRO_ELIMINAR_START
    };
};

export const registroEliminarSuccess = (data) => {
    //console.log(actionTypes.REGISTRO_ELIMINAR_SUCCESS);
    return {
        type: actionTypes.REGISTRO_ELIMINAR_SUCCESS,
        data: data
    };
};

export const registroEliminarFail = (error) => {
    //console.log(actionTypes.REGISTRO_ELIMINAR_FAIL);
    return {
        type: actionTypes.REGISTRO_ELIMINAR_FAIL,
        error: error
    };
};

export const registroCrear = (descripcion, importe, fecha_registro, error = (msg) => null, success = () => null) => {
    return dispatch => {
        dispatch(registroCrearStart());

        let url = config.backend + '/registros';

        const params = {
            descripcion: descripcion,
            importe: importe,
            fecha_registro: fecha_registro
        };

        session.getData('access-token').then(token => {
            axios.defaults.headers.common['access-token'] = token;

            axios.post(url, params).then(response => {
                if (!response.data.success) {
                    error(response.data.msg);
                    dispatch(registroCrearFail(response.data.msg));
                }
                else {
                    success();
                    dispatch(registroCrearSuccess(response.data.data));
                    //dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            }).catch(err => {
                console.log('err.response.data.msg', err.response.data.msg);
                dispatch(registroCrearFail(err));
            });
        });
    }
}

export const registroConsultar = (params) => {
    return dispatch => {
        dispatch(registroConsultarStart());

        let url = config.backend + '/registros';

        session.getData('access-token').then(token => {
            axios.defaults.headers.common['access-token'] = token;

            axios.get(url).then(response => {
                //console.log('store/actions/auth.js auth() axios.post() then response', response.data.data);
                //console.log('store/actions/auth.js auth() axios.post() then axios', axios.defaults.headers);
                //console.log('store/actions/auth.js auth() axios.post() response', response.data.data);

                if (!response.data.success) {
                    dispatch(registroConsultarFail(response.data.msg));
                }
                else {
                    dispatch(registroConsultarSuccess(response.data.data));
                    //dispatch(checkAuthTimeout(response.data.expiresIn));
                }

            }).catch(err => {
                dispatch(registroConsultarFail(err));
            });
        });

    }
}

export const registroEditar = (uuid, descripcion, importe, fecha_registro, error = (msg) => null, success = () => null) => {

    return dispatch => {
        dispatch(registroEditarStart());

        session.getData('access-token').then(token => {
            axios.defaults.headers.common['access-token'] = token;
            let url = config.backend + '/registros';

            const params = {
                uuid: uuid,
                descripcion: descripcion,
                importe: importe,
                fecha_registro: fecha_registro
            };

            axios.put(url, params).then(response => {

                if (!response.data.success) {
                    error();
                    dispatch(registroEditarFail(response.data.msg));
                }
                else {
                    success();
                    dispatch(registroEditarSuccess());
                    // dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            }).catch(err => {
                error(err.response.data.msg);
                dispatch(registroEditarFail(err.response.data.msg));
            });
        });
    }
}

export const registroEliminar = (uuid, error = (msg) => {}, success = () => {}) => {
    return dispatch => {
        dispatch(registroEliminarStart());

        let url = config.backend + '/registros/' + uuid;
        console.log(url);
        axios.delete(url).then(response => {
            if (!response.data.success) {
                error(response.data.msg);
                dispatch(registroEliminarFail(response.data.msg));
            }
            else {
                success();
                dispatch(registroEliminarSuccess(response.data.data));
            }
        }).catch(err => {
            error(err);
            dispatch(registroEliminarFail(err));
        });
    }
}

export const clearError = () => {
    return dispatch => {
        dispatch();
    }
}