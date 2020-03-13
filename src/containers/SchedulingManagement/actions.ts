import {createAction, Action} from 'redux-actions';
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


export const queryScheduling = createAction(QUERY_SCHEDULING);
export const querySchedulingSuccess = createAction(QUERY_SCHEDULING_SUCCESS);
export const querySchedulingFailure = createAction(QUERY_SCHEDULING_FAILURE);

export const deleteScheduling = createAction(DELETE_SCHEDULING);
export const deleteSchedulingSuccess = createAction(DELETE_SCHEDULING_SUCCESS);
export const deleteSchedulingFailure = createAction(DELETE_SCHEDULING_FAILURE);

export const updateScheduling = createAction(UPDATE_SCHEDULING);
export const updateSchedulingSuccess = createAction(UPDATE_SCHEDULING_SUCCESS);
export const updateSchedulingFailure = createAction(UPDATE_SCHEDULING_FAILURE);

export const addScheduling = createAction(ADD_SCHEDULING);
export const addSchedulingSuccess = createAction(ADD_SCHEDULING_SUCCESS);
export const addSchedulingFailure = createAction(ADD_SCHEDULING_FAILURE);

export const queryDepartment = createAction(QUERY_DEPARTMENT);
export const queryDepartmentSuccess = createAction(QUERY_DEPARTMENT_SUCCESS);
export const queryDepartmentFailure = createAction(QUERY_DEPARTMENT_FAILURE);

export const queryDoctor = createAction(QUERY_DOCTOR);
export const queryDoctorSuccess = createAction(QUERY_DOCTOR_SUCCESS);
export const queryDoctorFailure = createAction(QUERY_DOCTOR_FAILURE);

export const queryConsultingRoom = createAction(QUERY_CONSULTING_ROOM);
export const queryConsultingRoomSuccess = createAction(QUERY_CONSULTING_ROOM_SUCCESS);
export const queryConsultingRoomFailure = createAction(QUERY_CONSULTING_ROOM_FAILURE);