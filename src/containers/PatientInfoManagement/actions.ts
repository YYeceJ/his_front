import {createAction, Action} from 'redux-actions';
import {
    QUERY_PATIENT_INFO,
    QUERY_PATIENT_INFO_SUCCESS,
    QUERY_PATIENT_INFO_FAILURE
} from './constants'

export const queryPatientInfo = createAction(QUERY_PATIENT_INFO);
export const queryPatientInfoSuccess = createAction(QUERY_PATIENT_INFO_SUCCESS);
export const queryPatientInfoFailure = createAction(QUERY_PATIENT_INFO_FAILURE);
