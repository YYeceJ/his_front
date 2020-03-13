import {createAction, handleActions, Action} from 'redux-actions';
import {PATIENT_INFO_MANAGEMENT} from '../../constants';
import {
    QUERY_PATIENT_INFO,
    QUERY_PATIENT_INFO_SUCCESS,
    QUERY_PATIENT_INFO_FAILURE
} from './constants'

const initialState: any = {
    loading: false,
    patientInfoList: []
};

export const name = PATIENT_INFO_MANAGEMENT;

export const patientInfoManagementReducer = handleActions({
    [QUERY_PATIENT_INFO]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_PATIENT_INFO_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            patientInfoList: action.payload.data.records,
            loading: false
        });
    },
    [QUERY_PATIENT_INFO_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    }
}, initialState);
