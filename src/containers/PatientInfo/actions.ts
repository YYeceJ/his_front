import {createAction, Action} from 'redux-actions';
import {
    QUERY_PATIENT_INFO,
    QUERY_PATIENT_INFO_SUCCESS,
    QUERY_PATIENT_INFO_FAILURE,
    UPDATE_PATIENT_INFO,
    UPDATE_PATIENT_INFO_SUCCESS,
    UPDATE_PATIENT_INFO_FAILURE,
} from './constants'

export const queryPatientInfo = createAction(QUERY_PATIENT_INFO);
export const queryPatientInfoSuccess = createAction(QUERY_PATIENT_INFO_SUCCESS);
export const queryPatientInfoFailure = createAction(QUERY_PATIENT_INFO_FAILURE);

export const updatePatientInfo = createAction(UPDATE_PATIENT_INFO);
export const updatePatientInfoSuccess = createAction(UPDATE_PATIENT_INFO_SUCCESS);
export const updatePatientInfoFailure = createAction(UPDATE_PATIENT_INFO_FAILURE);
