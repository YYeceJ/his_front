import fetch from 'isomorphic-fetch';
import { GlobalDefinitions } from '../GlobalDefinitions';
import {cookie} from './cookieUtil';

export function autoRefreshTokenFetch(options: any) {
    let path = options.url;
    return new Promise((resolve, reject) => {
        fetch(path, options).then((response: any) => {
            if((response.status === 401 || response.status === -1) &&
                path.search((window as GlobalDefinitions).hempConfig.zAuth + "/token/access") === -1 &&
                path.search((window as GlobalDefinitions).hempConfig.zAuth + "/token/refresh") === -1 &&
                path.search((window as GlobalDefinitions).hempConfig.studentPath + "/changePasswordDirectly") === -1 &&
                path.search((window as GlobalDefinitions).hempConfig.studentPath + "/forgetPassword") === -1 &&
                (window as GlobalDefinitions).tokenCookie.refresh_token !== undefined &&
                (window as GlobalDefinitions).tokenCookie.refresh_token !== null) {
                    if((window as GlobalDefinitions).requestQueue === undefined) {  // init array when it's undefined
                        (window as GlobalDefinitions).requestQueue = new Array();
                    }
                    if((window as GlobalDefinitions).requestQueue.length === 0) {
                        (window as GlobalDefinitions).requestQueue.push({path: path, options: options, resolve: resolve, reject: reject});
                        fetch((window as GlobalDefinitions).hempConfig.zAuth + "/token/refresh", {
                            method:"POST",
                            headers:{
                                'Accept': 'application/json',
                                "Content-type":"application/json"
                            },
                            body: JSON.stringify({refreshToken: (window as GlobalDefinitions).tokenCookie.refresh_token})}).then((response: any) => {
                            if(response.ok) {
                                response.json().then((body: {access_token: string, refresh_token: string, token_type: string}) => {
                                    // update window.authorization
                                    (window as GlobalDefinitions).authorization = (window as GlobalDefinitions).tokenCookie.token_type + " " + body.access_token;
                                    // update window.tokenCookie
                                    (window as GlobalDefinitions).tokenCookie.access_token = body.access_token;
                                    (window as GlobalDefinitions).tokenCookie.refresh_token = body.refresh_token;
                                    // update tokenCookie [TODO]
                                    cookie.setItem("TokenCookie", JSON.stringify({
                                        "access_token": body.access_token,
                                        "refresh_token": body.refresh_token,
                                        "token_type": body.token_type
                                    }), "zhishinet.com", "/");
                                    // retry requests
                                    for (; (window as GlobalDefinitions).requestQueue.length > 0;) {
                                            var currReq = (window as GlobalDefinitions).requestQueue.shift();
                                            currReq.options.headers.Authorization = (window as GlobalDefinitions).authorization;
                                            fetch(currReq.path, currReq.options).then((response: any) => {
                                                currReq.resolve(response);
                                            }).catch((error: any) => {
                                                currReq.reject(error);
                                            });
                                        }
                                });
                            } else {
                                // refresh token failed, go to login page
                                console.log("refresh token failed with response: " + response.status);
                                window.location.href = (window as GlobalDefinitions).hempConfig.zAuth + "/logOff";
                            }
                        }).catch((error: any) => {
                            // refresh token failed, go to login page
                            console.log("refresh token failed with error: " + error);
                            window.location.href = (window as GlobalDefinitions).hempConfig.zAuth + "/logOff";
                        })
                    } else {
                        (window as GlobalDefinitions).requestQueue.push({path: path, options: options, resolve: resolve, reject: reject});
                    }
                // do token refresh and retry request
                console.log("will refresh token");
            } else {
                resolve(response);
            }
        }).catch((error: any) => {
            reject(error);
        })
    });
}
