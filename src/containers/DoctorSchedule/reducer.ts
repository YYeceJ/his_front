import {createAction, handleActions, Action} from 'redux-actions';
import {DOCTOR_SCHEDULE_REDUCER} from '../../constants';
import {
    QUERY_DOCTOR_SCHEDULE,
    QUERY_DOCTOR_SCHEDULE_SUCCESS,
    QUERY_DOCTOR_SCHEDULE_FAILURE,
    START_VISIT,
    START_VISIT_SUCCESS,
    START_VISIT_FAILURE,
    RECORD_MEDICAL,
    RECORD_MEDICAL_SUCCESS,
    RECORD_MEDICAL_FAILURE,
    REGISTER_MEDICAL,
    REGISTER_MEDICAL_SUCCESS,
    REGISTER_MEDICAL_FAILURE,
} from './constants'

const initialState: any = {
    loading: false,
    scheduleList: []
};

export const name = DOCTOR_SCHEDULE_REDUCER;

export const doctorScheduleReducer = handleActions({
    [QUERY_DOCTOR_SCHEDULE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_DOCTOR_SCHEDULE_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            scheduleList: action.payload.data.records,
            loading: false
        });
    },
    [QUERY_DOCTOR_SCHEDULE_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [START_VISIT]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [START_VISIT_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [START_VISIT_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [RECORD_MEDICAL]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [RECORD_MEDICAL_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [RECORD_MEDICAL_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [REGISTER_MEDICAL]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [REGISTER_MEDICAL_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [REGISTER_MEDICAL_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
}, initialState);
