import { createAction } from "redux-actions";
import {
    HTTP_SEND_FETCH_REQUESTED,
    HTTP_SEND_FETCH_REQUESTED_ERROR,
    HTTP_SEND_FETCH_REQUESTED_FAILED,
    HTTP_SEND_FETCH_REQUESTED_SUCCEED,
    GET_USER_INFO,
    GET_USER_INFO_SUCCEED,
    GET_USER_INFO_ERROR,
    GET_USER_INFO_FAILED,
    UPDATE_REDUCER
} from "./constants";

export const sendRequestData = createAction<any>(HTTP_SEND_FETCH_REQUESTED);
export const sendRequestDataSucceed = createAction<any>(HTTP_SEND_FETCH_REQUESTED_SUCCEED);
export const sendRequestDataError = createAction<any>(HTTP_SEND_FETCH_REQUESTED_ERROR);
export const sendRequestDataFailed = createAction<any>(HTTP_SEND_FETCH_REQUESTED_FAILED);

export const getUserInfo = createAction(GET_USER_INFO);
export const getUserInfoSucceed = createAction<any>(GET_USER_INFO_SUCCEED);
export const getUserInfoError = createAction<any>(GET_USER_INFO_ERROR);
export const getUserInfoFailed = createAction<any>(GET_USER_INFO_FAILED);

export const updateReducer = createAction<any>(UPDATE_REDUCER);
