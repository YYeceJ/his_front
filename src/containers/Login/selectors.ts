
import { createSelector } from "reselect";

const requestMsg = (state: any) => state.loginReducer.requestMsg;
const userData = (state: any) => state.loginReducer.userData;
const isLoading = (state: any) => state.loginReducer.isLoading;
const clientInfo = (state: any) => state.loginReducer.clientInfo;
const userAuthority = (state: any) => state.loginReducer.userAuthority;

export const getTokenSelector = createSelector(
    [requestMsg],
    (requestMsg: any) => {
        return requestMsg;
    }
);
export const getUserSelector = createSelector(
    [userData],
    (userData: any) => {
        return userData;
    }
);
export const getUserAuthoritySelector = createSelector(
    [userAuthority],
    (userAuthority: any) => {
        return userAuthority;
    }
);
export const getIsLoadingSelector = createSelector(
    [isLoading],
    (isLoading: any) => {
        return isLoading;
    }
);
export const getClientInfoSelector = createSelector(
    [clientInfo],
    (clientInfo: any) => {
        return clientInfo;
    }
);