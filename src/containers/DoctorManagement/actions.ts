import {createAction, Action} from 'redux-actions';
import {
    QUERY_DOCTOR,
    QUERY_DOCTOR_SUCCESS,
    QUERY_DOCTOR_FAILURE,
    DELETE_DOCTOR,
    DELETE_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAILURE,
    UPDATE_DOCTOR,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAILURE,
    ADD_DOCTOR,
    ADD_DOCTOR_SUCCESS,
    ADD_DOCTOR_FAILURE,
    QUERY_DEPARTMENT,
    QUERY_DEPARTMENT_SUCCESS,
    QUERY_DEPARTMENT_FAILURE
} from './constants'

export const queryDoctor = createAction(QUERY_DOCTOR);
export const queryDoctorSuccess = createAction(QUERY_DOCTOR_SUCCESS);
export const queryDoctorFailure = createAction(QUERY_DOCTOR_FAILURE);
export const deleteDoctor = createAction(DELETE_DOCTOR);
export const deleteDoctorSuccess = createAction(DELETE_DOCTOR_SUCCESS);
export const deleteDoctorFailure = createAction(DELETE_DOCTOR_FAILURE);
export const updateDoctor = createAction(UPDATE_DOCTOR);
export const updateDoctorSuccess = createAction(UPDATE_DOCTOR_SUCCESS);
export const updateDoctorFailure = createAction(UPDATE_DOCTOR_FAILURE);
export const addDoctor = createAction(ADD_DOCTOR);
export const addDoctorSuccess = createAction(ADD_DOCTOR_SUCCESS);
export const addDoctorFailure = createAction(ADD_DOCTOR_FAILURE);
export const queryDepartment = createAction(QUERY_DEPARTMENT);
export const queryDepartmentSuccess = createAction(QUERY_DEPARTMENT_SUCCESS);
export const queryDepartmentFailure = createAction(QUERY_DEPARTMENT_FAILURE);