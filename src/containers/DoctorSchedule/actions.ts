import {createAction, Action} from 'redux-actions';
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

export const queryDoctorSchedule = createAction(QUERY_DOCTOR_SCHEDULE);
export const queryDoctorScheduleSuccess = createAction(QUERY_DOCTOR_SCHEDULE_SUCCESS);
export const queryDoctorScheduleFailure = createAction(QUERY_DOCTOR_SCHEDULE_FAILURE);

export const updateScheduling = createAction(UPDATE_SCHEDULING);
export const updateSchedulingSuccess = createAction(UPDATE_SCHEDULING_SUCCESS);
export const updateSchedulingFailure = createAction(UPDATE_SCHEDULING_FAILURE);

export const queryPatientRecord = createAction(QUERY_PATIENT_RECORD);
export const queryPatientRecordSuccess = createAction(QUERY_PATIENT_RECORD_SUCCESS);
export const queryPatientRecordFailure = createAction(QUERY_PATIENT_RECORD_FAILURE);