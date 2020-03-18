import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryScheduleSuccess, queryScheduleFailure,
    appointVisitSuccess, appointVisitFailure,
    queryDepartmentFailure, queryDepartmentSuccess,
    queryPatientRecordFailure, queryPatientRecordSuccess, querySchedule
} from './actions';

import {
    APPOINT_VISIT, QUERY_DEPARTMENT,
    QUERY_SCHEDULE,QUERY_PATIENT_RECORD
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";
import {message, notification} from "antd";

function* queryScheduleSaga(action: Action<any>) {
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
            yield put(queryScheduleSuccess(json));
        } else {
            errorHandler(json);
            yield put(queryScheduleFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(queryScheduleFailure(error));
    }
}

function* appointVisitSaga(action: Action<any>) {
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
            yield put(appointVisitSuccess(json));
            message.success("预约成功，请按时就诊");
            yield put(querySchedule({status: 0}));
        } else {
            errorHandler(json);
            yield put(appointVisitFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(appointVisitFailure(error));
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

export default function* appointVisitSagas() {
    yield takeEvery(QUERY_SCHEDULE, queryScheduleSaga);
    yield takeEvery(APPOINT_VISIT, appointVisitSaga);
    yield takeEvery(QUERY_DEPARTMENT, queryDepartmentSaga);
    yield takeEvery(QUERY_PATIENT_RECORD, queryPatientRecordSaga);
}

