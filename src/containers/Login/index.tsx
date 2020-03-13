/**
 * Created by yan.zhao on 2019/11/06.
 * 登录页
 */
import * as React from "react";
import style from "./style.scss";
import { Layout, Button, } from "antd";
import { connect } from "react-redux";
import { sendRequestData, updateReducer } from "./actions";
const { Content } = Layout;
import { RouteComponentProps } from "react-router-dom";
import { getTokenSelector, getUserSelector, getIsLoadingSelector, getClientInfoSelector, getUserAuthoritySelector } from "./selectors";
// import { GlobalDefinitions } from "../../GlobalDefinitions";
const loginImg = require("../../images/Login/login_img.png");


interface LoginOwnProps extends RouteComponentProps<any> {
    route?: any,
}

interface LoginStateProps {
    requestMsg?: any; // 接口请求报错信息
    userData?: any; // 学生信息
    userAuthority?: any;// 用户权限
    isLoading?: any; // 接口响应成功标志
    clientInfo?: any; // 客户端版本信息
}

interface LoginDispatchProps {
    sendRequestData?: Function; // 发送用户名和密码
    getVersionFun?: Function; // 获取版本信息
    getVersionSuccessFun?: Function; // 获取版本信息成功
    updateReducer?: Function;   // 更新reducer
}

interface LoginState {
    loginName?: any; // 用户名
    loginPass?: any; // 密码
    errorMsg?: string; // 校验提示文字
    isDisable?: boolean; // 登录按钮禁用标志
}

@(connect(
    (state: any) => (
        {
            requestMsg: getTokenSelector(state),
            userData: getUserSelector(state),
            isLoading: getIsLoadingSelector(state),
            clientInfo: getClientInfoSelector(state),
            userAuthority: getUserAuthoritySelector(state)
        }
    ),
    (dispatch: any) => (
        {
            sendRequestData(param: any) {
                dispatch(sendRequestData(param));
            },
            updateReducer: (param: any) => {
                dispatch(updateReducer(param));
            }
        }
    )
) as any)

export default class Login extends React.Component<LoginOwnProps & LoginStateProps & LoginDispatchProps, LoginState> {
    constructor(props: LoginOwnProps & LoginStateProps & LoginDispatchProps) {
        super(props);
        const prevAccount = this.props.location.state ? this.props.location.state.prevAccount : "";
        this.state = {
            loginName: prevAccount,
            loginPass: "",
            errorMsg: "",
            isDisable: false,
        };

    }

    componentWillReceiveProps(nextProps: any) {
        if (this.props.requestMsg !== nextProps.requestMsg && nextProps.requestMsg) {
            this.setState({ errorMsg: nextProps.requestMsg[0] });
        }
        if (this.props.isLoading !== nextProps.isLoading) {
            this.setState({ isDisable: nextProps.isLoading });
        }
        // 获取学生信息成功跳转至首页
        if (nextProps.userData !== null && nextProps.userAuthority !== this.props.userAuthority) {
            console.log("userAuthority data is:", nextProps.userAuthority);
            const { menuCodes } = nextProps.userAuthority;
            // const isAuthrity = menuCodes.some((item: any) => {
            //     return item === "STS_STUDENT_CLIENT_INDEX";
            // });
            // if (!isAuthrity) {
            //     window.myHistory.replace("/noAuthority");
            // } else {
            //     window.myHistory.replace("/mainPage");
            // }
        }
    }

    componentWillUnmount() {
        const { updateReducer } = this.props;
        updateReducer && updateReducer({ isLoading: false });
    }

    // 输入账号
    handleUsernameChange = (e: any) => {
        this.setState({ loginName: e.target.value, errorMsg: "" });
    }

    // 输入密码
    handlePasswordChange = (e: any) => {
        this.setState({ loginPass: e.target.value, errorMsg: "" });
    }

    // 点击登录
    sendValueData = () => {
        const { loginName, loginPass } = this.state;
        if (loginName === "" && loginPass === "") {
            this.setState({ errorMsg: "用户名或密码不能为空！" });
        } else if (loginName.length < 7 || loginName.length > 20) {
            this.setState({ errorMsg: "请输入7-20位用户名" });
        } else if (loginPass.length < 8 || loginPass.length > 20) {
            this.setState({ errorMsg: "请输入8-20位密码" });
        } else {
            const requestParam = {
                username: loginName.replace(/\s/g, ""),// 过滤掉用户名中的空格
                password: loginPass,
                identity: "student"
            };
            this.props.sendRequestData(requestParam);
        }

    }

    // 回车键登录
    keyLogin = (e: any) => {
        if (e.keyCode === 13) {
            this.sendValueData();
        }
    }

    render() {
        const { errorMsg, isDisable, loginName } = this.state;
        const { clientInfo } = this.props;
        return (
            <Layout id={style.loginContainer}>
                <Content>
                    <div>
                        <div className={style.loginBody}>
                            <div className={style.loginForm}>
                                <div className={style.title}>欢迎进入视听说系统</div>
                                <input
                                    className={style.account}
                                    type="text"
                                    value={loginName}
                                    onChange={this.handleUsernameChange}
                                    placeholder="请输入账号"
                                />
                                <input
                                    className={style.account}
                                    type="password"
                                    onChange={this.handlePasswordChange}
                                    onKeyDown={this.keyLogin}
                                    placeholder="请输入密码"
                                />
                                {errorMsg && <div className={style.errorMsg}>{errorMsg}</div>}
                                <Button className={isDisable ? style.disable : undefined} onClick={this.sendValueData}>{isDisable ? "正在登录..." : "登录"}</Button>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}
