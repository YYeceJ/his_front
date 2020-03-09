import { combineReducers } from "redux";
import { createAction, handleActions, Action } from 'redux-actions';
import { routerReducer } from 'react-router-redux';

import { counterReducer, name as counterReducerName } from './containers/Team1/reducer';
import { counterReducer as counterReducerForTeam2, name as counterReducerForTeam2Name } from './containers/Team2/reducer';
import { RN_ROUTER } from './constants';
import {doctorManagementReducer, name as doctorManagementReducerName} from "./containers/DoctorManagement/reducer";

export default function createReducer(asyncReducers: any) {
    return combineReducers({
        [RN_ROUTER]: routerReducer,
        [counterReducerName]: counterReducer,
        [counterReducerForTeam2Name]: counterReducerForTeam2,
        [doctorManagementReducerName]: doctorManagementReducer,
        ...asyncReducers,
    });
}
