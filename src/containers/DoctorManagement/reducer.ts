import {createAction, handleActions, Action} from 'redux-actions';
import {DOCTOR_MANAGEMENT_REDUCER} from '../../constants';
import {
    QUERY_DOCTOR,
    QUERY_DOCTOR_SUCCESS,
    QUERY_DOCTOR_FAILURE,
    DELETE_DOCTOR,
    DELETE_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAILURE,
    UPDATE_DOCTOR,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAILURE,
    ADD_DOCTOR,
    ADD_DOCTOR_SUCCESS,
    ADD_DOCTOR_FAILURE,
    QUERY_DEPARTMENT,
    QUERY_DEPARTMENT_SUCCESS,
    QUERY_DEPARTMENT_FAILURE
} from './constants'

const CONST_ARR:any = []
const initialState: any = {
    loading: false,
    departmentList: [],
    doctorList: CONST_ARR
};

export const name = DOCTOR_MANAGEMENT_REDUCER;

export const doctorManagementReducer = handleActions({
    [QUERY_DOCTOR]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true,
            doctorList: CONST_ARR
        });
    },
    [QUERY_DOCTOR_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            doctorList: action.payload,
            loading: false
        });
    },
    [QUERY_DOCTOR_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false,
            doctorList: CONST_ARR
        });
    },
    [DELETE_DOCTOR]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [DELETE_DOCTOR_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [DELETE_DOCTOR_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_DOCTOR]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [UPDATE_DOCTOR_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_DOCTOR_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [ADD_DOCTOR]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [ADD_DOCTOR_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [ADD_DOCTOR_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [QUERY_DEPARTMENT]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_DEPARTMENT_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false,
            departmentList: action.payload.data.records
        });
    },
    [QUERY_DEPARTMENT_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    }
}, initialState);
