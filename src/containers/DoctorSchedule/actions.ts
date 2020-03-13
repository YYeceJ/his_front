import {createAction, Action} from 'redux-actions';
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

export const queryDoctorSchedule = createAction(QUERY_DOCTOR_SCHEDULE);
export const queryDoctorScheduleSuccess = createAction(QUERY_DOCTOR_SCHEDULE_SUCCESS);
export const queryDoctorScheduleFailure = createAction(QUERY_DOCTOR_SCHEDULE_FAILURE);

export const startVisit = createAction(START_VISIT);
export const startVisitSuccess = createAction(START_VISIT_SUCCESS);
export const startVisitFailure = createAction(START_VISIT_FAILURE);

export const recordMedical = createAction(RECORD_MEDICAL);
export const recordMedicalSuccess = createAction(RECORD_MEDICAL_SUCCESS);
export const recordMedicalFailure = createAction(RECORD_MEDICAL_FAILURE);

export const registerMedical = createAction(REGISTER_MEDICAL);
export const registerMedicalSuccess = createAction(REGISTER_MEDICAL_SUCCESS);
export const registerMedicalFailure = createAction(REGISTER_MEDICAL_FAILURE);
