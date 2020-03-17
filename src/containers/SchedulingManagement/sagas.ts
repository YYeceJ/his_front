import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    querySchedulingSuccess, querySchedulingFailure, queryScheduling,
    deleteSchedulingSuccess, deleteSchedulingFailure,
    updateSchedulingSuccess, updateSchedulingFailure,
    addSchedulingSuccess, addSchedulingFailure,
    queryDoctorFailure, queryDoctorSuccess,
    queryDepartmentFailure, queryDepartmentSuccess,
    queryConsultingRoomFailure, queryConsultingRoomSuccess
} from './actions';

import {
    QUERY_SCHEDULING,
    DELETE_SCHEDULING,
    UPDATE_SCHEDULING,
    ADD_SCHEDULING,
    QUERY_DEPARTMENT, QUERY_DOCTOR, QUERY_CONSULTING_ROOM
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";
import {message} from "antd";

function* querySchedulingSaga(action: Action<any>) {
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
            yield put(querySchedulingSuccess(json));
        } else {
            errorHandler(json);
            yield put(querySchedulingFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(querySchedulingFailure(error));
    }
}

function* deleteSchedulingSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/scheduling/delete'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (json.success) {
            yield put(deleteSchedulingSuccess(json));
            yield put(queryScheduling());
        } else {
            errorHandler(json);
            message.error(json.message);
            yield put(deleteSchedulingFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(deleteSchedulingFailure(error));
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
            yield put(queryScheduling());
        } else {
            errorHandler(json);
            yield put(updateSchedulingFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(updateSchedulingFailure(error));
    }
}

function* addSchedulingSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/scheduling/save'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(addSchedulingSuccess(json));
            yield put(queryScheduling());
        } else {
            errorHandler(json);
            yield put(addSchedulingFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(addSchedulingFailure(error));
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
            url: window.hempConfig.serverPath + '/doctor'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
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
            url: window.hempConfig.serverPath + '/consultationRoom'
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

export default function* schedulingManagementSagas() {
    yield takeEvery(QUERY_SCHEDULING, querySchedulingSaga);
    yield takeEvery(DELETE_SCHEDULING, deleteSchedulingSaga);
    yield takeEvery(UPDATE_SCHEDULING, updateSchedulingSaga);
    yield takeEvery(ADD_SCHEDULING, addSchedulingSaga);
    yield takeEvery(QUERY_DEPARTMENT, queryDepartmentSaga);
    yield takeEvery(QUERY_DOCTOR, queryDoctorSaga);
    yield takeEvery(QUERY_CONSULTING_ROOM, queryConsultingRoomSaga);
}

