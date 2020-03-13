import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryPatientInfoSuccess, queryPatientInfoFailure
} from './actions';

import {
    QUERY_PATIENT_INFO
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";

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

export default function* patientInfoManagementSagas() {
    yield takeEvery(QUERY_PATIENT_INFO, queryPatientInfoSaga);
}

