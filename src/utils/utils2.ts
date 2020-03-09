/**
 * Created by yunqiang.wu on 25/05/2017.
 */

import querystring from 'querystring';
import {autoRefreshTokenFetch} from "./autoRefreshTokenFetch";
import {GlobalDefinitions} from "../GlobalDefinitions";

/**
 * 调用WebService
 * @param {{url: string; data?: Object; method: ("post" | "get"); processData?: boolean; processReturnData?: boolean; headers?: Object; isGetText?: boolean}} options
 * @returns {Promise<any>}
 */
export function request(options: {
    url: string,
    data?: Object,   // 请求参数  Object  如果 默认会自动序列化成请求参数
    method: 'post' | 'get',  // 请求方法   post  get
    processData?: boolean,  // 是否处理 data ，为false 表示不处理  比如要传 formData 必须设置为false
    processReturnData?: boolean,  // 是否自动处理返回的数据 如果为false  返回的会是 Blob 对象 ，可以用来做下载文件的操作
    headers?: Object,    // headers 信息  ，后面会默认自动加上 Authorization
    isGetText?: boolean  // 是否获取纯文本

}) {
    const {
        url,
        data,   // 请求参数  Object  如果 默认会自动序列化成请求参数
        method,  // 请求方法   post  get
        processData = true,  // 是否处理 data ，为false 表示不处理  比如要传 formData 必须设置为false
        processReturnData = true,  // 是否自动处理返回的数据 如果为false  返回的会是 Blob 对象 ，可以用来做下载文件的操作
        headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },    // headers 信息  ，后面会默认自动加上 Authorization
        isGetText = false  // 是否获取纯文本
    } = options;

    let query: any, body: any;
    if ((method + '').toLowerCase().trim() == "post") {
        body = data;
    } else {
        query = data;
    }

    let req = {
        method: method,
        credentials: 'include',
        headers: {
            'Cache-Control': ' no-cache',
            ...headers,
        },
        url: url + ((query && Object.keys(query).length > 0) ? (  '?' + querystring.stringify(query)) : ''),
        body: body ? ( processData ? JSON.stringify(body) : body) : undefined
    }

    return new Promise((resolve, reject) => {
        let _window = (window as any);

        const delay = (timeout: number) => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, timeout);
            })
        }
        const waitAuthorization = async (n: number) => {
            let i = 0;
            while (i < n) {
                if (!_window.authorization) {
                    await delay(500);
                } else {
                    break;
                }
                i++
            }
            if (!_window.authorization) {
                setTimeout(() => {
                    window.location.href = (window as GlobalDefinitions).hempConfig.basePath;
                }, 2000);
                throw {message: "等待tooken超时！", success: false}
            }
        };

        return waitAuthorization(10).then(() => {
            resolve({
                ...req,
                headers: {
                    ...req.headers,
                    'Authorization': (window as GlobalDefinitions).authorization,
                }
            })
        }).catch((error) => {
            reject(error)
        })
    }).then((req) => {
        return autoRefreshTokenFetch(req).then(
            (response: Response) => {
                if (!response.ok) {
                    try {
                        return response.json().then((data) => {
                            return Promise.reject({
                                success: false,
                                ...data,
                            });
                        }).catch((e) => {
                            return Promise.reject({
                                success: false,
                                ...e,
                            });
                        })
                    } catch (e) {
                        const {statusText, status} = response
                        return Promise.reject({
                            success: false,
                            message: statusText || `http请求报错：错误码：${response.status}`,
                            ...response,
                        });
                    }

                }
                if (isGetText) {
                    return Promise.resolve(response.text())
                }
                if (!processReturnData) {
                    return Promise.resolve(response.blob())
                }
                let dataPromise;
                dataPromise = response.json();
                const {statusText, status} = response
                return dataPromise.then((data: any) => {
                    return {
                        success: true,
                        message: statusText,
                        statusCode: status,
                        length: data.length,
                        ...data,
                    }
                })
            }
        ).catch((error: any) => {
            const {response} = error;
            let msg
            let statusCode
            if (response && response instanceof Object) {
                const {statusText} = response
                statusCode = response.status
                msg = statusText
            } else {
                statusCode = 600
                msg = error.message || 'Network Error'
            }
            return Promise.reject({success: false, statusCode, message: msg, ...error})
        })
    });
}

// 跳转路由
export const routerPush = ({pathname, query, isReplace}: { pathname: any, query?: any, isReplace?: any }) => {
    let appHistory: any = (window as any).appHistory;
    if (isReplace) {
        appHistory.replace(pathname + (query ? ( '?' + querystring.stringify(query)) : ''))
    } else {
        appHistory.push(pathname + (query ? ( '?' + querystring.stringify(query)) : ''))
    }
}
