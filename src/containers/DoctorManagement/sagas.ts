import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryDoctorSuccess, queryDoctorFailure,
    deleteDoctorSuccess, deleteDoctorFailure,
    updateDoctorSuccess, updateDoctorFailure,
    addDoctorSuccess, addDoctorFailure,
    queryDepartmentSuccess, queryDepartmentFailure,
} from './actions';

import {
    QUERY_DOCTOR,
    DELETE_DOCTOR,
    UPDATE_DOCTOR,
    ADD_DOCTOR,
    QUERY_DEPARTMENT
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";

function* queryDoctorSaga(action: Action<any>) {
    try {
        const request = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': window.authorization,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            url: window.hempConfig.serverPath + '/doctor' + utils.getUrlParam(action.payload)
        };
        const response = (yield call(autoRefreshTokenFetch,request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(queryDoctorSuccess(json));
        } else {
            errorHandler(json);
            yield put(queryDoctorFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(queryDoctorFailure(error));
    }
}

function* deleteDoctorSaga(action: Action<any>) {
    try {
        const request = {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Authorization': window.authorization,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            url: window.hempConfig.serverPath + '/doctor/'+action.payload
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(deleteDoctorSuccess(json));
        } else {
            errorHandler(json);
            yield put(deleteDoctorFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(deleteDoctorFailure(error));
    }
}

function* updateDoctorSaga(action: Action<any>) {
    try {
        const request = {
            method: 'UPDATE',
            credentials: 'include',
            headers: {
                'Authorization': window.authorization,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            body:JSON.stringify(action.payload),
            url: window.hempConfig.serverPath + '/doctor'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(updateDoctorSuccess(json));
        } else {
            errorHandler(json);
            yield put(updateDoctorFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(updateDoctorFailure(error));
    }
}

function* addDoctorSaga(action: Action<any>) {
    try {
        const request = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': window.authorization,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            body:JSON.stringify(action.payload),
            url: window.hempConfig.serverPath + '/doctor'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(addDoctorSuccess(json));
        } else {
            errorHandler(json);
            yield put(addDoctorFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(addDoctorFailure(error));
    }
}

function* queryDepartmentSaga(action: Action<any>) {
    try {
        const request = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': window.authorization,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            url: window.hempConfig.serverPath + '/department'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(queryDepartmentSuccess(json));
        } else {
            errorHandler(json);
            yield put(queryDepartmentFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(queryDepartmentFailure(error));
    }
}


export default function* doctorDepartmentSagas() {
    yield takeEvery(QUERY_DOCTOR, queryDoctorSaga);
    yield takeEvery(DELETE_DOCTOR, deleteDoctorSaga);
    yield takeEvery(UPDATE_DOCTOR, updateDoctorSaga);
    yield takeEvery(ADD_DOCTOR, addDoctorSaga);
    yield takeEvery(QUERY_DEPARTMENT, queryDepartmentSaga);
}

