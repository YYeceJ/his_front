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
    QUERY_DEPARTMENT_FAILURE,
    QUERY_TITLE,
    QUERY_TITLE_SUCCESS,
    QUERY_TITLE_FAILURE,
} from './constants'

const initialState: any = {
    loading: false,
    departmentList: [],
    doctorList: [],
    titleList:[]
};

export const name = DOCTOR_MANAGEMENT_REDUCER;

export const doctorManagementReducer = handleActions({
    [QUERY_DOCTOR]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
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
            loading: false
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
        console.log("----param----", "reducer");
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_DEPARTMENT_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false,
            departmentList: action.payload
        });
    },
    [QUERY_DEPARTMENT_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [QUERY_TITLE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_TITLE_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false,
            titleList: action.payload
        });
    },
    [QUERY_TITLE_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
}, initialState);
