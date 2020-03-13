import {createAction, Action} from 'redux-actions';
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

export const queryConsultingRoom = createAction(QUERY_CONSULTING_ROOM);
export const queryConsultingRoomSuccess = createAction(QUERY_CONSULTING_ROOM_SUCCESS);
export const queryConsultingRoomFailure = createAction(QUERY_CONSULTING_ROOM_FAILURE);

export const deleteConsultingRoom = createAction(DELETE_CONSULTING_ROOM);
export const deleteConsultingRoomSuccess = createAction(DELETE_CONSULTING_ROOM_SUCCESS);
export const deleteConsultingRoomFailure = createAction(DELETE_CONSULTING_ROOM_FAILURE);

export const updateConsultingRoom = createAction(UPDATE_CONSULTING_ROOM);
export const updateConsultingRoomSuccess = createAction(UPDATE_CONSULTING_ROOM_SUCCESS);
export const updateConsultingRoomFailure = createAction(UPDATE_CONSULTING_ROOM_FAILURE);

export const addConsultingRoom = createAction(ADD_CONSULTING_ROOM);
export const addConsultingRoomSuccess = createAction(ADD_CONSULTING_ROOM_SUCCESS);
export const addConsultingRoomFailure = createAction(ADD_CONSULTING_ROOM_FAILURE);

export const queryDepartment = createAction(QUERY_DEPARTMENT);
export const queryDepartmentSuccess = createAction(QUERY_DEPARTMENT_SUCCESS);
export const queryDepartmentFailure = createAction(QUERY_DEPARTMENT_FAILURE);