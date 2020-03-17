import {createAction, Action} from 'redux-actions';
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

export const querySchedule = createAction(QUERY_SCHEDULE);
export const queryScheduleSuccess = createAction(QUERY_SCHEDULE_SUCCESS);
export const queryScheduleFailure = createAction(QUERY_SCHEDULE_FAILURE);

export const appointVisit = createAction(APPOINT_VISIT);
export const appointVisitSuccess = createAction(APPOINT_VISIT_SUCCESS);
export const appointVisitFailure = createAction(APPOINT_VISIT_FAILURE);

export const queryDepartment = createAction(QUERY_DEPARTMENT);
export const queryDepartmentSuccess = createAction(QUERY_DEPARTMENT_SUCCESS);
export const queryDepartmentFailure = createAction(QUERY_DEPARTMENT_FAILURE);

export const queryPatientRecord = createAction(QUERY_PATIENT_RECORD);
export const queryPatientRecordSuccess = createAction(QUERY_PATIENT_RECORD_SUCCESS);
export const queryPatientRecordFailure = createAction(QUERY_PATIENT_RECORD_FAILURE);

