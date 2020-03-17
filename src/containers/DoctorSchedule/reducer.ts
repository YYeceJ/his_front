import {createAction, handleActions, Action} from 'redux-actions';
import {DOCTOR_SCHEDULE_REDUCER} from '../../constants';
import {
    QUERY_DOCTOR_SCHEDULE,
    QUERY_DOCTOR_SCHEDULE_SUCCESS,
    QUERY_DOCTOR_SCHEDULE_FAILURE,
    UPDATE_SCHEDULING,
    UPDATE_SCHEDULING_FAILURE,
    UPDATE_SCHEDULING_SUCCESS,
    QUERY_PATIENT_RECORD,
    QUERY_PATIENT_RECORD_FAILURE,
    QUERY_PATIENT_RECORD_SUCCESS
} from './constants'

const initialState: any = {
    loading: false,
    scheduleList: [],
    patientRecord: [],
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
            scheduleList: action.payload.data,
            loading: false
        });
    },
    [QUERY_DOCTOR_SCHEDULE_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_SCHEDULING]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [UPDATE_SCHEDULING_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_SCHEDULING_FAILURE]: (state, action: Action<any>) => {
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
