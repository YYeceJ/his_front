import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryDoctorScheduleSuccess, queryDoctorScheduleFailure,
    startVisitSuccess, startVisitFailure,
    recordMedicalSuccess, recordMedicalFailure,
    registerMedicalSuccess, registerMedicalFailure
} from './actions';

import {
    QUERY_DOCTOR_SCHEDULE,
    START_VISIT,
    RECORD_MEDICAL,
    REGISTER_MEDICAL,
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";

function* queryDoctorScheduleSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/scheduling'+utils.getUrlParam(action.payload)
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(queryDoctorScheduleSuccess(json));
        } else {
            errorHandler(json);
            yield put(queryDoctorScheduleFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(queryDoctorScheduleFailure(error));
    }
}

function* startVisitSaga(action: Action<any>) {
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
            yield put(startVisitSuccess(json));
        } else {
            errorHandler(json);
            yield put(startVisitFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(startVisitFailure(error));
    }
}

function* recordMedicalSaga(action: Action<any>) {
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
            yield put(recordMedicalSuccess(json));
        } else {
            errorHandler(json);
            yield put(recordMedicalFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(recordMedicalFailure(error));
    }
}

function* registerMedicalSaga(action: Action<any>) {
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
            yield put(registerMedicalSuccess(json));
        } else {
            errorHandler(json);
            yield put(registerMedicalFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(registerMedicalFailure(error));
    }
}

export default function* doctorScheduleSagas() {
    yield takeEvery(QUERY_DOCTOR_SCHEDULE, queryDoctorScheduleSaga);
    yield takeEvery(START_VISIT, startVisitSaga);
    yield takeEvery(RECORD_MEDICAL, recordMedicalSaga);
    yield takeEvery(REGISTER_MEDICAL, registerMedicalSaga);
}

