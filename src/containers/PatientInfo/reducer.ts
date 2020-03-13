import {createAction, handleActions, Action} from 'redux-actions';
import {PATIENT_INFO_MANAGEMENT_REDUCER} from '../../constants';
import {
    QUERY_PATIENT_INFO,
    QUERY_PATIENT_INFO_SUCCESS,
    QUERY_PATIENT_INFO_FAILURE,
    UPDATE_PATIENT_INFO,
    UPDATE_PATIENT_INFO_SUCCESS,
    UPDATE_PATIENT_INFO_FAILURE,
} from './constants'

const initialState: any = {
    loading: false,
    patientInfo: {}
};

export const name = PATIENT_INFO_MANAGEMENT_REDUCER;

export const patientInfoReducer = handleActions({
    [QUERY_PATIENT_INFO]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_PATIENT_INFO_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            patientInfo: action.payload.data.records[0],
            loading: false
        });
    },
    [QUERY_PATIENT_INFO_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_PATIENT_INFO]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [UPDATE_PATIENT_INFO_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_PATIENT_INFO_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    }
}, initialState);
