/*
 * Copyright 2016 snipking.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Store } from 'redux';
import { SagaMiddleware } from 'redux-saga';
import { HEMPConfig } from './config';

declare global {
    interface Window {
        store: Store<any>,  // redux state store
        authorization: string,
        user: any,
        sagaMiddleware: SagaMiddleware<{}>;
        asyncReducers: {[key: string]: any};
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
        hempConfig: HEMPConfig;
        appHistory: any,
        userId: any,
        username: any,
        requestQueue: {path: string, options: any, resolve: any, reject: any}[],
        tokenCookie: { token: string},
        basePath: string,
        userData: any;// 用户信息
    }
}

export interface GlobalDefinitions extends Window {

}

