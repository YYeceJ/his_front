import {createAction, Action} from 'redux-actions';
import {
    QUERY_VISIT_RECORD,
    QUERY_VISIT_RECORD_SUCCESS,
    QUERY_VISIT_RECORD_FAILURE
} from './constants'
export const queryVisitRecord = createAction(QUERY_VISIT_RECORD);
export const queryVisitRecordSuccess = createAction(QUERY_VISIT_RECORD_SUCCESS);
export const queryVisitRecordFailure = createAction(QUERY_VISIT_RECORD_FAILURE);

