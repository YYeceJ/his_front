import {createAction, handleActions, Action} from 'redux-actions';
import {APPOINT_VISIT_REDUCER} from '../../constants';
import {
    QUERY_SCHEDULE,
    QUERY_SCHEDULE_SUCCESS,
    QUERY_SCHEDULE_FAILURE,
    APPOINT_VISIT,
    APPOINT_VISIT_SUCCESS,
    APPOINT_VISIT_FAILURE,
    QUERY_DEPARTMENT, QUERY_DEPARTMENT_FAILURE, QUERY_DEPARTMENT_SUCCESS,
    QUERY_PATIENT_RECORD,
    QUERY_PATIENT_RECORD_FAILURE,
    QUERY_PATIENT_RECORD_SUCCESS
} from './constants'

const initialState: any = {
    loading: false,
    scheduleList: [],
    departmentList: [],
    patientRecord:[]
};

export const name = APPOINT_VISIT_REDUCER;

export const appointVisitReducer = handleActions({
    [QUERY_SCHEDULE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_SCHEDULE_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            scheduleList: action.payload.data,
            loading: false
        });
    },
    [QUERY_SCHEDULE_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [APPOINT_VISIT]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [APPOINT_VISIT_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [APPOINT_VISIT_FAILURE]: (state, action: Action<any>) => {
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
    },
    [QUERY_PATIENT_RECORD]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_PATIENT_RECORD_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            patientRecord:action.payload.data,
            loading: false
        });
    },
    [QUERY_PATIENT_RECORD_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
}, initialState);
