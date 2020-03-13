import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryScheduleSuccess, queryScheduleFailure,
    appointVisitSuccess, appointVisitFailure,
    queryDepartmentFailure, queryDepartmentSuccess,
} from './actions';

import {
    APPOINT_VISIT, QUERY_DEPARTMENT,
    QUERY_SCHEDULE,
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";

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
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': window.authorization,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            url: window.hempConfig.serverPath + '/patient'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(appointVisitSuccess(json));
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

export default function* visitRecordSagas() {
    yield takeEvery(QUERY_SCHEDULE, queryScheduleSaga);
    yield takeEvery(APPOINT_VISIT, appointVisitSaga);
    yield takeEvery(QUERY_DEPARTMENT, queryDepartmentSaga);
}

