import fetch from 'isomorphic-fetch';
import {GlobalDefinitions} from '../GlobalDefinitions';
import {cookie} from './cookieUtil';
import {message} from "antd";

export function autoRefreshTokenFetch(options: any) {
    let path = options.url;
    return new Promise((resolve, reject) => {
        fetch(path, options).then((response: any) => {
            if ((response.status === 401 || response.status === -1) &&
                path.search((window as GlobalDefinitions).hempConfig.zAuth + "/doctor/login") === -1) {
                message.error("请重新登陆");
            } else {
                resolve(response);
            }
        }).catch((error: any) => {
            reject(error);
        })
    });
}
