import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryConsultingRoomSuccess, queryConsultingRoomFailure,queryConsultingRoom,
    deleteConsultingRoomSuccess, deleteConsultingRoomFailure,
    updateConsultingRoomSuccess, updateConsultingRoomFailure,
    addConsultingRoomSuccess, addConsultingRoomFailure,
    queryDepartmentFailure, queryDepartmentSuccess
} from './actions';

import {
    QUERY_CONSULTING_ROOM,
    DELETE_CONSULTING_ROOM,
    UPDATE_CONSULTING_ROOM,
    ADD_CONSULTING_ROOM,
    QUERY_DEPARTMENT
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";

function* queryConsultingRoomSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/consultationRoom' + utils.getUrlParam(action.payload)
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(queryConsultingRoomSuccess(json));
        } else {
            errorHandler(json);
            yield put(queryConsultingRoomFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(queryConsultingRoomFailure(error));
    }
}

function* deleteConsultingRoomSaga(action: Action<any>) {
    try {
        const request = {
            method: "POST",
            credentials: 'include',
            headers: {
                'Authorization': window.authorization,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': ' no-cache'
            },
            body: JSON.stringify(action.payload),
            url: window.hempConfig.serverPath + '/consultationRoom/delete'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(deleteConsultingRoomSuccess(json));
            yield put(queryConsultingRoom());
        } else {
            errorHandler(json);
            yield put(deleteConsultingRoomFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(deleteConsultingRoomFailure(error));
    }
}

function* updateConsultingRoomSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/consultationRoom/modify'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(updateConsultingRoomSuccess(json));
            yield put(queryConsultingRoom());
        } else {
            errorHandler(json);
            yield put(updateConsultingRoomFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(updateConsultingRoomFailure(error));
    }
}

function* addConsultingRoomSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/consultationRoom/save'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(addConsultingRoomSuccess(json));
            yield put(queryConsultingRoom());
        } else {
            errorHandler(json);
            yield put(addConsultingRoomFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(addConsultingRoomFailure(error));
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

export default function* consultationRoomManagementSagas() {
    yield takeEvery(QUERY_CONSULTING_ROOM, queryConsultingRoomSaga);
    yield takeEvery(DELETE_CONSULTING_ROOM, deleteConsultingRoomSaga);
    yield takeEvery(UPDATE_CONSULTING_ROOM, updateConsultingRoomSaga);
    yield takeEvery(ADD_CONSULTING_ROOM, addConsultingRoomSaga);
    yield takeEvery(QUERY_DEPARTMENT, queryDepartmentSaga);
}

