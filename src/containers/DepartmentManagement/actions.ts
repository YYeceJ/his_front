import {createAction, Action} from 'redux-actions';
import {
    QUERY_DEPARTMENT,
    QUERY_DEPARTMENT_SUCCESS,
    QUERY_DEPARTMENT_FAILURE,
    DELETE_DEPARTMENT,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAILURE,
    UPDATE_DEPARTMENT,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAILURE,
    ADD_DEPARTMENT,
    ADD_DEPARTMENT_SUCCESS,
    ADD_DEPARTMENT_FAILURE,
} from './constants'

export const queryDepartment = createAction(QUERY_DEPARTMENT);
export const queryDepartmentSuccess = createAction(QUERY_DEPARTMENT_SUCCESS);
export const queryDepartmentFailure = createAction(QUERY_DEPARTMENT_FAILURE);

export const deleteDepartment = createAction(DELETE_DEPARTMENT);
export const deleteDepartmentSuccess = createAction(DELETE_DEPARTMENT_SUCCESS);
export const deleteDepartmentFailure = createAction(DELETE_DEPARTMENT_FAILURE);

export const updateDepartment = createAction(UPDATE_DEPARTMENT);
export const updateDepartmentSuccess = createAction(UPDATE_DEPARTMENT_SUCCESS);
export const updateDepartmentFailure = createAction(UPDATE_DEPARTMENT_FAILURE);

export const addDepartment = createAction(ADD_DEPARTMENT);
export const addDepartmentSuccess = createAction(ADD_DEPARTMENT_SUCCESS);
export const addDepartmentFailure = createAction(ADD_DEPARTMENT_FAILURE);


