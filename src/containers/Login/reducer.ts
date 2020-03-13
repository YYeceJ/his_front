/**
 * Created by yan.zhao on 2019/11/06.
 */
import { Action, handleActions } from "redux-actions";
import { UTIL } from "../../utils/utils";
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

export const loginReducer = handleActions({
    [HTTP_SEND_FETCH_REQUESTED]: (state: any) => {
        return Object.assign({}, state, {
            isLoading: true
        });
    },
    [HTTP_SEND_FETCH_REQUESTED_SUCCEED]: (state: any) => {
        return Object.assign({}, state, {
            isLoading: true
        });
    },
    [HTTP_SEND_FETCH_REQUESTED_ERROR]: (state: any, action: Action<any>) => {
        console.log("HTTP_SEND_FETCH_REQUESTED_ERROR", action.payload);
        const response = action.payload;
        let errorMsg: any;
        if (response.status === 401) { // 用户名或密码错误
            errorMsg = "登陆失败！请检查用户名及密码并重试。";
        } else if (response.status === 400) {
            if (response.json && response.json.code === "01400999") { // 用户被锁定
                const t = response.json.extras.unlockTime;
                const hour = new Date(parseInt(t)).getHours() < 10 ? `0${new Date(parseInt(t)).getHours()}` : new Date(parseInt(t)).getHours();
                const Minutes = new Date(parseInt(t)).getMinutes() < 10 ? `0${new Date(parseInt(t)).getMinutes()}` : new Date(parseInt(t)).getMinutes();
                const unLockTime = `${hour}:${Minutes}`;
                errorMsg = `该账号已被锁定，${unLockTime}自动解锁，或者联系客服解锁`;
            } else {
                errorMsg = "登录失败，用户信息认证失败！";
            }
        } else if (response.status === 403) {
            errorMsg = "登录失败，无效的角色！";
        } else if (response.status === 500) {
            errorMsg = "系统异常";
        }
        return Object.assign({}, state, {
            requestMsg: [errorMsg, new Date().getTime],
            isLoading: false
        });
    },
    [HTTP_SEND_FETCH_REQUESTED_FAILED]: (state: any) => {
        return Object.assign({}, state, {
            isLoading: false
        });
    },
    // 获取用户信息
    [GET_USER_INFO]: (state) => {
        return Object.assign({}, state, {
            isLoading: true
        });
    },
    [GET_USER_INFO_SUCCEED]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            userData: action.payload,
            isLoading: true
        });
    },
    [GET_USER_INFO_ERROR]: (state, action: Action<any>) => {
        let errorMsg: any;
        if (action.payload === 403) {
            errorMsg = "无访问权限！请联系客服。";
        } else {
            errorMsg = "获取用户信息失败";
        }
        return Object.assign({}, state, {
            requestMsg: [errorMsg, new Date().getTime],
            isLoading: false
        });
    },
    [GET_USER_INFO_FAILED]: (state, action: Action<any>) => {
        console.log("GET_USER_INFO_FAILED", action.payload);
        return Object.assign({}, state, {
            isLoading: false
        });
    },

    [UPDATE_REDUCER]: (state, action: Action<any>) => {
        return Object.assign({}, state, action.payload);
    }
}, {
    requestMsg: "", // 报错信息
    userData: null,// 学生数据
    userAuthority: null,// 用户权限
    isLoading: false,
    clientInfo: {} // 版本信息
});