import {createAction, handleActions, Action} from 'redux-actions';
import {CONSULTING_ROOM_MANAGEMENT_REDUCER} from '../../constants';
import {
    QUERY_CONSULTING_ROOM,
    QUERY_CONSULTING_ROOM_SUCCESS,
    QUERY_CONSULTING_ROOM_FAILURE,
    DELETE_CONSULTING_ROOM,
    DELETE_CONSULTING_ROOM_SUCCESS,
    DELETE_CONSULTING_ROOM_FAILURE,
    UPDATE_CONSULTING_ROOM,
    UPDATE_CONSULTING_ROOM_SUCCESS,
    UPDATE_CONSULTING_ROOM_FAILURE,
    ADD_CONSULTING_ROOM,
    ADD_CONSULTING_ROOM_SUCCESS,
    ADD_CONSULTING_ROOM_FAILURE,
    QUERY_DEPARTMENT, QUERY_DEPARTMENT_FAILURE, QUERY_DEPARTMENT_SUCCESS
} from './constants'
const initialState: any = {
    loading: false,
    consultingRoomList: []
};

export const name = CONSULTING_ROOM_MANAGEMENT_REDUCER;

export const consultingRoomManagementReducer = handleActions({
    [QUERY_CONSULTING_ROOM]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_CONSULTING_ROOM_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            consultingRoomList: action.payload.data.records,
            loading: false
        });
    },
    [QUERY_CONSULTING_ROOM_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [DELETE_CONSULTING_ROOM]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [DELETE_CONSULTING_ROOM_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [DELETE_CONSULTING_ROOM_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_CONSULTING_ROOM]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [UPDATE_CONSULTING_ROOM_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_CONSULTING_ROOM_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [ADD_CONSULTING_ROOM]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [ADD_CONSULTING_ROOM_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [ADD_CONSULTING_ROOM_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [QUERY_DEPARTMENT]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_DEPARTMENT_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false,
            departmentList: action.payload.data.records
        });
    },
    [QUERY_DEPARTMENT_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
}, initialState);
