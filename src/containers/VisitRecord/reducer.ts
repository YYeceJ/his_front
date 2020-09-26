import {createAction, handleActions, Action} from 'redux-actions';
import {VISIT_RECORD_REDUCER} from '../../constants';
import {
    QUERY_VISIT_RECORD,
    QUERY_VISIT_RECORD_SUCCESS,
    QUERY_VISIT_RECORD_FAILURE
} from './constants'

const initialState: any = {
    loading: false,
    visitRecordList: []
};

export const name = VISIT_RECORD_REDUCER;

export const visitRecordReducer = handleActions({
    [QUERY_VISIT_RECORD]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_VISIT_RECORD_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            visitRecordList: action.payload.data,
            loading: false
        });
    },
    [QUERY_VISIT_RECORD_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    }
}, initialState);
