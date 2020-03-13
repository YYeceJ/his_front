import {createAction, handleActions, Action} from 'redux-actions';
import {DEPARTMENT_MANAGEMENT_REDUCER} from '../../constants';
import {
    QUERY_DEPARTMENT,
    QUERY_DEPARTMENT_SUCCESS,
    QUERY_DEPARTMENT_FAILURE,
    DELETE_DEPARTMENT,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAILURE,
    UPDATE_DEPARTMENT,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAILURE,
    ADD_DEPARTMENT,
    ADD_DEPARTMENT_SUCCESS,
    ADD_DEPARTMENT_FAILURE,
} from './constants'

const initialState: any = {
    loading: false,
    departmentList: [],
    doctorList: []
};

export const name = DEPARTMENT_MANAGEMENT_REDUCER;

export const departmentManagementReducer = handleActions({
    [DELETE_DEPARTMENT]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [DELETE_DEPARTMENT_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [DELETE_DEPARTMENT_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_DEPARTMENT]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [UPDATE_DEPARTMENT_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_DEPARTMENT_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [ADD_DEPARTMENT]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [ADD_DEPARTMENT_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [ADD_DEPARTMENT_FAILURE]: (state, action: Action<any>) => {
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
            departmentList: action.payload
        });
    },
    [QUERY_DEPARTMENT_FAILURE]: (state, action: Action<any>) => {
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
