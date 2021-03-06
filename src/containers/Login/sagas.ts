import {call, put, takeEvery} from "redux-saga/effects";
import {Action} from "redux-actions";
import {HTTP_SEND_FETCH_REQUESTED, GET_USER_INFO, REGISTER} from "./constants";
import {
    sendRequestDataError,
    sendRequestDataFailed,
    sendRequestDataSucceed,
    getUserInfo,
    getUserInfoError,
    getUserInfoFailed,
    getUserInfoSucceed,
    register,
    registerSucceed, registerError, registerFailed,
} from "./actions";
import {autoRefreshTokenFetch} from "../../utils/autoRefreshTokenFetch";
import {errorHandler} from "../../utils/errorHandler";
import {message, notification} from "antd";

function* sendRequestData(action: Action<any>) {
    const identity = localStorage.getItem("identity");
    const url = identity === "patient" ? "/patient/login" : "/doctor/login";
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
            url: `${window.hempConfig.serverPath}` + `${url}`
        };
        const response = (yield call(autoRefreshTokenFetch, request)) as Response;
        const json = yield response.json();

        if (json.success) {
            localStorage.setItem("authorization", "Bearer " + json.data);
            window.authorization = localStorage.getItem("authorization");
            yield put(sendRequestDataSucceed(json));
            yield put(getUserInfo());
        } else {
            notification.error({
                message: `请求错误 `,
                description: json.message,
            });
            yield put(sendRequestDataError(json));
        }
    } catch (error) {
        localStorage.removeItem("authorization");
        errorHandler(error);
        yield put(sendRequestDataFailed(error));
    }
}

function* requestUserInfo() {
    const identity = localStorage.getItem("identity");
    const url = identity === "patient" ? "/patient/profile" : "/doctor/profile";
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
            url: `${window.hempConfig.serverPath}${url}`
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

function* registerSaga(action: Action<any>) {
    try {
        const req = {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": window.authorization,
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Cache-Control": " no-cache"
            },
            body: JSON.stringify(action.payload),
            url: `${window.hempConfig.serverPath}/patient/register`
        };

        const response = (yield call(autoRefreshTokenFetch, req)) as Response;
        const json = yield response.json();
        if (response.ok && json) {
            if (json.success) {
                yield put(registerSucceed(json));
                yield localStorage.setItem("registerSuccess", "true");
                yield message.success("注册成功，请登录");
            } else {
                message.error(json.message);
            }
        } else {
            yield put(registerError(json));
        }
    } catch (error) {
        localStorage.removeItem("authorization");
        errorHandler(error);
        yield put(registerFailed(error));
    }
}


export default function* loginSagas() {
    yield takeEvery(HTTP_SEND_FETCH_REQUESTED, sendRequestData);
    yield takeEvery(GET_USER_INFO, requestUserInfo);
    yield takeEvery(REGISTER, registerSaga);
}