import {createAction, handleActions, Action} from 'redux-actions';
import {SCHEDULING_MANAGEMENT_REDUCER} from '../../constants';
import {
    QUERY_SCHEDULING,
    QUERY_SCHEDULING_SUCCESS,
    QUERY_SCHEDULING_FAILURE,
    DELETE_SCHEDULING,
    DELETE_SCHEDULING_SUCCESS,
    DELETE_SCHEDULING_FAILURE,
    UPDATE_SCHEDULING,
    UPDATE_SCHEDULING_SUCCESS,
    UPDATE_SCHEDULING_FAILURE,
    ADD_SCHEDULING,
    ADD_SCHEDULING_SUCCESS,
    ADD_SCHEDULING_FAILURE,
    QUERY_DEPARTMENT, QUERY_DEPARTMENT_FAILURE, QUERY_DEPARTMENT_SUCCESS,
    QUERY_DOCTOR, QUERY_DOCTOR_FAILURE, QUERY_DOCTOR_SUCCESS,
    QUERY_CONSULTING_ROOM,
    QUERY_CONSULTING_ROOM_FAILURE,
    QUERY_CONSULTING_ROOM_SUCCESS
} from './constants'

const initialState: any = {
    loading: false,
    schedulingList: [],
    doctorList:[],
    departmentList:[],
    consultingRoomList:[]
};

export const name = SCHEDULING_MANAGEMENT_REDUCER;

export const schedulingManagementReducer = handleActions({
    [QUERY_SCHEDULING]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_SCHEDULING_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            schedulingList: action.payload.data.records,
            loading: false
        });
    },
    [QUERY_SCHEDULING_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [DELETE_SCHEDULING]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [DELETE_SCHEDULING_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [DELETE_SCHEDULING_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_SCHEDULING]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [UPDATE_SCHEDULING_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [UPDATE_SCHEDULING_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [ADD_SCHEDULING]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [ADD_SCHEDULING_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
    [ADD_SCHEDULING_FAILURE]: (state, action: Action<any>) => {
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
    [QUERY_DOCTOR]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [QUERY_DOCTOR_SUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            doctorList: action.payload,
            loading: false
        });
    },
    [QUERY_DOCTOR_FAILURE]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            loading: false
        });
    },
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
}, initialState);
