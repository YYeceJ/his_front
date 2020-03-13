import {combineReducers} from "redux";
import {createAction, handleActions, Action} from 'redux-actions';
import {routerReducer} from 'react-router-redux';

import {counterReducer, name as counterReducerName} from './containers/Team1/reducer';
import {counterReducer as counterReducerForTeam2, name as counterReducerForTeam2Name} from './containers/Team2/reducer';
import {RN_ROUTER} from './constants';
import {doctorManagementReducer, name as doctorManagementReducerName} from "./containers/DoctorManagement/reducer";
import {
    departmentManagementReducer,
    name as departmentManagementReducerName
} from "./containers/DepartmentManagement/reducer";
import {
    patientInfoManagementReducer,
    name as patientInfoManagementReducerName
} from "./containers/PatientInfoManagement/reducer";
import {
    consultingRoomManagementReducer,
    name as consultingRoomManagementReducerName
} from "./containers/ConsultingRoomManagement/reducer";
import {
    schedulingManagementReducer,
    name as schedulingManagementReducerName
} from "./containers/SchedulingManagement/reducer";
import {doctorScheduleReducer, name as doctorScheduleReducerName} from "./containers/DoctorSchedule/reducer";
import {patientInfoReducer, name as patientInfoReducerName} from "./containers/PatientInfo/reducer";
import {visitRecordReducer, name as visitRecordReducerName} from "./containers/VisitRecord/reducer";
import {appointVisitReducer, name as appointVisitReducerName} from "./containers/AppointVisit/reducer";

export default function createReducer(asyncReducers: any) {
    return combineReducers({
        [RN_ROUTER]: routerReducer,
        [counterReducerName]: counterReducer,
        [counterReducerForTeam2Name]: counterReducerForTeam2,
        [doctorManagementReducerName]: doctorManagementReducer,
        [departmentManagementReducerName]: departmentManagementReducer,
        [patientInfoManagementReducerName]: patientInfoManagementReducer,
        [consultingRoomManagementReducerName]: consultingRoomManagementReducer,
        [schedulingManagementReducerName]: schedulingManagementReducer,
        [doctorScheduleReducerName]: doctorScheduleReducer,
        [patientInfoReducerName]: patientInfoReducer,
        [visitRecordReducerName]: visitRecordReducer,
        [appointVisitReducerName]: appointVisitReducer,
        ...asyncReducers,
    });
}
