/**
 * Created by yan.zhao on 2019/11/06.
 * 登录页
 */
import * as React from "react";
import style from "./style.scss";
import {Layout, Button, Input, Form, Row, Col,} from "antd";
import {connect} from "react-redux";
import {sendRequestData, updateReducer} from "./actions";
import {push, replace} from "react-router-redux";
import {Link, RouteComponentProps} from "react-router-dom";

interface LoginOwnProps extends RouteComponentProps<any> {
    route?: any,
}

interface LoginStateProps {
    requestMsg?: any; // 接口请求报错信息
    userData?: any; // 学生信息
    isLoading?: any; // 接口响应成功标志
}

interface LoginDispatchProps {
    sendRequestData?: Function; // 发送用户名和密码
    getVersionFun?: Function; // 获取版本信息
    getVersionSuccessFun?: Function; // 获取版本信息成功
    updateReducer?: Function;   // 更新reducer
    gotoMainPageFun?: Function;
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
            requestMsg: state.loginReducer.requestMsg,
            userData: state.loginReducer.userData,
            isLoading: state.loginReducer.isLoading,
        }
    ),
    (dispatch: any) => (
        {
            sendRequestData(param: any) {
                dispatch(sendRequestData(param));
            },
            updateReducer: (param: any) => {
                dispatch(updateReducer(param));
            },
            gotoMainPageFun: () => {
                dispatch(replace('/MainPage'));
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
            this.setState({errorMsg: nextProps.requestMsg[0]});
        }
        if (this.props.isLoading !== nextProps.isLoading) {
            this.setState({isDisable: nextProps.isLoading});
        }
        // 获取学生信息成功跳转至首页
        if (this.props.userData !== nextProps.userData && nextProps.userData) {
            console.log("----param--2--", nextProps.userData);
            this.props.history.push("/MainPage");
        }
    }

    componentWillUnmount() {
        const {updateReducer} = this.props;
        updateReducer && updateReducer({isLoading: false});
    }

    // 输入账号
    handleUsernameChange = (e: any) => {
        this.setState({loginName: e.target.value, errorMsg: ""});
    }

    // 输入密码
    handlePasswordChange = (e: any) => {
        this.setState({loginPass: e.target.value, errorMsg: ""});
    }

    // 点击登录
    sendValueData = () => {
        const {loginName, loginPass} = this.state;
        if (loginName === "" && loginPass === "") {
            this.setState({errorMsg: "用户名或密码不能为空！"});
        } else if (loginName.length < 7 || loginName.length > 20) {
            this.setState({errorMsg: "请输入7-20位用户名"});
        } else if (loginPass.length < 8 || loginPass.length > 20) {
            this.setState({errorMsg: "请输入8-20位密码"});
        } else {
            const requestParam = {
                account: loginName.replace(/\s/g, ""),// 过滤掉用户名中的空格
                password: loginPass
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
        const {errorMsg, isDisable, loginName} = this.state;
        console.log("----userData----", typeof this.props.userData);
        console.log("----store----", window.store);
        return (
            <div className={style.page}>
                <div className={style.loginBody}>
                    <div className={style.loginForm}>
                        <div className={style.title}>WELCOME</div>
                        <Row>
                            <Input
                                className={style.account}
                                type="text"
                                value={loginName}
                                onChange={this.handleUsernameChange}
                                placeholder="请输入账号"
                            />
                        </Row>
                        <Row>
                            <Input
                                className={style.account}
                                type="password"
                                onChange={this.handlePasswordChange}
                                onKeyDown={this.keyLogin}
                                placeholder="请输入密码"
                            />
                        </Row>
                        {errorMsg && <div className={style.errorMsg}>{errorMsg}</div>}
                        <Button className={isDisable ? style.disable : undefined}
                                onClick={this.sendValueData}>{isDisable ? "正在登录..." : "登录"}</Button>
                    </div>
                </div>
            </div>
        );
    }
}
