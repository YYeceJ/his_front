/**
 * Created by xu.long on 25/05/2017.
 */
import querystring from 'querystring';
import {autoRefreshTokenFetch} from "./autoRefreshTokenFetch";
import {GlobalDefinitions} from "../GlobalDefinitions";

export const utils = {
    /**
     * 得到get请求后面的参数部分
     * @param param
     * @returns {String}
     */
    getUrlParam: (param: any) => {
        let on = true, result: String = "";
        for (let item in param) {
            if (on) {
                on = false;
                result = "?" + item + "=" + param[item];
            } else {
                result = result + "&" + item + "=" + param[item];
            }
        }
        return result;
    },

    /**
     * 得到get请求后面的参数部分,并去掉参数值为空的
     * @param param
     * @returns {String}
     */
    getUrlParam2: (param: any) => {
        let on = true, result: String = "";
        for (let item in param) {
            if (on) {
                on = false;
                if (param[item]) {
                    result = "?" + item + "=" + param[item];
                } else {
                    result = "?";
                }
            } else {
                if (param[item]) {
                    result = result + "&" + item + "=" + param[item];
                } else {
                    result = result;
                }
            }
        }
        return result;
    },

    /**
     *
     * @param {string} str 要截取字符串长度
     * @param {number} length 要截取长度
     * @returns {string}
     */
    getViewString(str: string, length: number) {
        if (str != null && length != null) {
            return str.length <= length ? str : str.substring(0, length) + ' ...';
        }
    },

    /**
     * @param v
     * @returns {boolean}
     */
    isEmpty: (v: any) => {
        switch (typeof v) {
            case 'undefined':
                return true;
            case 'string':
                if (v.trim().length === 0 || v.trim() === "")
                    return true;
                break;
            case 'boolean':
                if (!v)
                    return true;
                break;
            case 'number':
                if (0 === v)
                    return true;
                break;
            case 'object':
                if (null === v) {
                    return true;
                } else if (undefined !== v.length && v.length === 0) {
                    return true;
                } else {
                    return false;
                }
        }
        return false;
    },

    /**
     * 消息中心url格式校验
     * @param h5url
     * @returns {boolean}
     */
    h5UrlCheck: (h5Url: any) => {
        var h5UrlReg = /^([hH][tT]{2}[pP][sS]:\/\/)/;
        var check = h5UrlReg.test(h5Url);
        return check;
    },
    isPhoneNumber: (phone: string) => {
        return (/^[1-9]\d{10}$/.test(phone));
    },
    //生成uuid
    uuid: () => {
        let s: any = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        let uuid = s.join("");
        return uuid;
    },

    formatDateTime: (inputTime: any) => {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m: string | number = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d: string | number = date.getDate();
        d = d < 10 ? ('0' + d) : d;

        return y + '-' + m + '-' + d;
    }

}

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
        url: url + (query ? ('?' + querystring.stringify(query)) : ''),
        body: body ? (processData ? JSON.stringify(body) : body) : undefined
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
                throw {message: "等待tooken超时！", success: false}
            }
        };

        return waitAuthorization(8).then(() => {
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

export module UTIL {
    export function clone(myObj: any): any {
        if (myObj == null) return myObj;
        if (myObj.constructor === Array) {
            let myNewArray: any = new Array();
            for (let j in myObj)
                myNewArray.push(this.clone(myObj[j]));
            return myNewArray;
        } else if (myObj.constructor === Object) {
            let myNewObj: any = new Object();
            for (let i in myObj)
                myNewObj[i] = this.clone(myObj[i]);
            return myNewObj;
        } else {
            return myObj;
        }
    }
}


// 跳转路由
export const routerPush = ({pathname, query, isReplace}: { pathname: any, query?: any, isReplace?: any }) => {
    let appHistory: any = (window as any).appHistory;
    if (isReplace) {
        appHistory.replace(pathname + (query ? ('?' + querystring.stringify(query)) : ''))
    } else {
        appHistory.push(pathname + (query ? ('?' + querystring.stringify(query)) : ''))

    }
}

