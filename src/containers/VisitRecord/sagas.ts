import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';

import {
    queryVisitRecordSuccess, queryVisitRecordFailure
} from './actions';

import {
    QUERY_VISIT_RECORD
} from './constants'

import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {utils} from "../../utils/utils";

function* queryVisitRecordSaga(action: Action<any>) {
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
            url: window.hempConfig.serverPath + '/scheduling'+ utils.getUrlParam(action.payload)
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        let json = yield response.json();
        if (response.ok) {
            yield put(queryVisitRecordSuccess(json));
        } else {
            errorHandler(json);
            yield put(queryVisitRecordFailure(response.status));
        }
    } catch (error) {
        errorHandler(error);
        yield put(queryVisitRecordFailure(error));
    }
}

export default function* visitRecordSagas() {
    yield takeEvery(QUERY_VISIT_RECORD, queryVisitRecordSaga);
}

