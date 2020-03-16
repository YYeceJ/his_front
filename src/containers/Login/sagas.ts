import {call, put, takeEvery} from "redux-saga/effects";
import {Action} from "redux-actions";
import {HTTP_SEND_FETCH_REQUESTED, GET_USER_INFO} from "./constants";
import {
    sendRequestDataError,
    sendRequestDataFailed,
    sendRequestDataSucceed, getUserInfo, getUserInfoError, getUserInfoFailed, getUserInfoSucceed,
} from "./actions";
import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";

function* sendRequestData(action: Action<any>) {
    try {
        const param = action.payload;
        const request = {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(param),
            timeout: 20000,
            url: `${window.hempConfig.serverPath}/doctor/login`
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        if (response.ok) {
            const json = yield response.json();
            localStorage.setItem("authorization", "Bearer " + json.data);
            console.log("localstorage存储完成");
            window.authorization = localStorage.getItem("authorization");
            yield put(sendRequestDataSucceed(json));
            yield put(getUserInfo());
        } else {
            const json = yield response.json();
            console.log(json);
            yield put(sendRequestDataError(json));
        }
    } catch (error) {
        localStorage.removeItem("authorization");
        errorHandler(error);
        yield put(sendRequestDataFailed(error));
    }
}

function* requestUserInfo() {
    try {
        const req = {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": window.authorization,
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Cache-Control": " no-cache"
            },
            url: `${window.hempConfig.serverPath}/doctor/profile`
        };
        const response = (yield call(autoRefreshTokenFetch, req)) as Response;
        const json = yield response.json();
        if (response.ok) {
            yield localStorage.setItem("userData", JSON.stringify(json.data));
            yield put(getUserInfoSucceed(json));
        } else {
            yield put(getUserInfoError(json));
        }
    } catch (error) {
        localStorage.removeItem("authorization");
        errorHandler(error);
        yield put(getUserInfoFailed(error));
    }
}


export default function* loginSagas() {
    yield takeEvery(HTTP_SEND_FETCH_REQUESTED, sendRequestData);
    yield takeEvery(GET_USER_INFO, requestUserInfo);
}