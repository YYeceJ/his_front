import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryPatientInfoSuccess, queryPatientInfoFailure,
    updatePatientInfoSuccess, updatePatientInfoFailure,
} from './actions';

import {
    QUERY_PATIENT_INFO,
    UPDATE_PATIENT_INFO,
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";
import {message} from "antd";

function* queryPatientInfoSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/patient'+ utils.getUrlParam(action.payload)
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(queryPatientInfoSuccess(json));
        } else {
            errorHandler(json);
            yield put(queryPatientInfoFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(queryPatientInfoFailure(error));
    }
}

function* updatePatientInfoSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/patient/modify'
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(updatePatientInfoSuccess(json));
            yield message.success("修改信息成功");
        } else {
            errorHandler(json);
            yield put(updatePatientInfoFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(updatePatientInfoFailure(error));
    }
}

export default function* patientInfoSagas() {
    yield takeEvery(QUERY_PATIENT_INFO, queryPatientInfoSaga);
    yield takeEvery(UPDATE_PATIENT_INFO, updatePatientInfoSaga);
}

