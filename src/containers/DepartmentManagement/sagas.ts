import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    deleteDepartmentSuccess, deleteDepartmentFailure,
    updateDepartmentSuccess, updateDepartmentFailure,
    addDepartmentSuccess, addDepartmentFailure,
    queryDepartmentSuccess, queryDepartmentFailure,
} from './actions';

import {
    DELETE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    ADD_DEPARTMENT,
    QUERY_DEPARTMENT
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";

function* deleteDepartmentSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/department'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(deleteDepartmentSuccess(json));
        } else {
            errorHandler(json);
            yield put(deleteDepartmentFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(deleteDepartmentFailure(error));
    }
}

function* updateDepartmentSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/department'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(updateDepartmentSuccess(json));
        } else {
            errorHandler(json);
            yield put(updateDepartmentFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(updateDepartmentFailure(error));
    }
}

function* addDepartmentSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/department'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(addDepartmentSuccess(json));
        } else {
            errorHandler(json);
            yield put(addDepartmentFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(addDepartmentFailure(error));
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
            url: window.hempConfig.serverPath + '/department'+ utils.getUrlParam(action.payload)
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

export default function* departmentDepartmentSagas() {
    yield takeEvery(QUERY_DEPARTMENT, queryDepartmentSaga);
    yield takeEvery(DELETE_DEPARTMENT, deleteDepartmentSaga);
    yield takeEvery(UPDATE_DEPARTMENT, updateDepartmentSaga);
    yield takeEvery(ADD_DEPARTMENT, addDepartmentSaga);
}

