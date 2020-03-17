import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryDoctorScheduleSuccess, queryDoctorScheduleFailure, queryDoctorSchedule,
    updateSchedulingFailure, updateSchedulingSuccess, queryPatientRecordSuccess, queryPatientRecordFailure
} from './actions';

import {
    QUERY_DOCTOR_SCHEDULE, QUERY_PATIENT_RECORD,
    UPDATE_SCHEDULING
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
            url: window.hempConfig.serverPath + '/scheduling' + utils.getUrlParam(action.payload)
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

function* queryPatientRecordSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/scheduling' + utils.getUrlParam(action.payload)
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(queryPatientRecordSuccess(json));
        } else {
            errorHandler(json);
            yield put(queryPatientRecordFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(queryPatientRecordFailure(error));
    }
}

function* updateSchedulingSaga(action: Action<any>) {
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
            body: JSON.stringify(action.payload),
            url: window.hempConfig.serverPath + '/scheduling/modify'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(updateSchedulingSuccess(json));
            yield put(queryDoctorSchedule({
                doctorid: JSON.parse(localStorage.getItem("userData")).doctorid
            }));
        } else {
            errorHandler(json);
            yield put(updateSchedulingFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(updateSchedulingFailure(error));
    }
}

export default function* doctorScheduleSagas() {
    yield takeEvery(QUERY_DOCTOR_SCHEDULE, queryDoctorScheduleSaga);
    yield takeEvery(UPDATE_SCHEDULING, updateSchedulingSaga);
    yield takeEvery(QUERY_PATIENT_RECORD, queryPatientRecordSaga);
}

