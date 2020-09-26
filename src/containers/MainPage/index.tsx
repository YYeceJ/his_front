import React from "react";
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import {Redirect, Switch} from 'react-router';
import {BrowserRouter, Route, Link, withRouter, RouteComponentProps} from 'react-router-dom';
import {connect, MapStateToProps} from 'react-redux';
import style from './style.scss'

import {NoMatch} from '../NoMatch';

import createRoutes from '../../routes';
import {DoctorManagementForm} from "../DoctorManagement";
import {DepartmentManagementForm} from "../DepartmentManagement";
import {PatientInfoForm} from "../PatientInfo";
import {PatientInfoManagementForm} from "../PatientInfoManagement";
import {ConsultingRoomManagementForm} from "../ConsultingRoomManagement";
import {SchedulingManagementForm} from "../SchedulingManagement";
import {DoctorScheduleForm} from "../DoctorSchedule";
import {VisitRecordForm} from "../VisitRecord";
import {AppointVisitForm} from "../AppointVisit";

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;

export interface MainPageOwnProps extends RouteComponentProps<any> {
    routes?: any; //组件内需要进行路由时的路由信息
}

export interface MainPageStateProps {
}

export interface MainPageState {
    selectedKey?: any; // 左边menu 选中的项
    selectedMenuIndex?: any; // 左边menu 选中的项
}

export class MainPage extends React.Component<MainPageStateProps & MainPageOwnProps, MainPageState> {
    private identity = localStorage.getItem("identity");
    constructor(props: MainPageStateProps & MainPageOwnProps) {
        super(props);
        this.state = {
            selectedKey: this.identity === "doctor" ? "DoctorSchedule" : "AppointVisit",
            selectedMenuIndex: 0
        };
    }

    isHaveAuth = (authArr: Array<any>, code: string) => {
        if(authArr){
            const index = authArr.findIndex((item: any) => item.code === code);
            if (index === -1) {
                return false;
            } else {
                return true;
            }
        }
    }

    render() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const identity = localStorage.getItem("identity");
        const {auth} = userData;
        const {selectedMenuIndex} = this.state;
        const menuList: Array<any> = [
            {
                key: "doctorManagement",
                navText: "医生管理",
                component: <DoctorManagementForm/>,
                auth: this.isHaveAuth(auth, "DOCTOR_MANAGEMENT"),
                path: "/doctorManagement"
            },
            {
                key: "departmentManagement",
                navText: "科室管理",
                component: <DepartmentManagementForm/>,
                auth: this.isHaveAuth(auth, "DEPARTMENT_MANAGEMENT"),
                path: "/departmentManagement"
            },
            {
                key: "patientInfoManagement",
                navText: "患者信息管理",
                component: <PatientInfoManagementForm/>,
                auth: this.isHaveAuth(auth, "PATIENTINFO_MANAGEMENT"),
                path: "/patientInfoManagement"
            },
            {
                key: "ConsultingRoomManagement",
                navText: "诊室管理",
                component: <ConsultingRoomManagementForm/>,
                auth: this.isHaveAuth(auth, "CONSULTING_ROOM_MANAGEMENT"),
                path: "/ConsultingRoomManagement"
            },
            {
                key: "SchedulingManagement",
                navText: "排班管理",
                component: <SchedulingManagementForm/>,
                auth: this.isHaveAuth(auth, "SCHEDULING_MANAGEMENT"),
                path: "/SchedulingManagement"
            },
            {
                key: "DoctorSchedule",
                navText: "我的排班",
                component: <DoctorScheduleForm/>,
                auth: this.isHaveAuth(auth, "DOCTOR_SCHEDULE"),
                path: "/DoctorSchedule"
            },
            {
                key: "PatientInfo",
                navText: "个人信息管理",
                component: <PatientInfoForm/>,
                auth: identity === "patient",
                path: "/PatientInfo"
            },
            {
                key: "VisitRecord",
                navText: "就诊记录",
                component: <VisitRecordForm/>,
                auth: identity === "patient",
                path: "/VisitRecord"
            },
            {
                key: "AppointVisit",
                navText: "预约就诊",
                component: <AppointVisitForm/>,
                auth: identity === "patient",
                path: "/AppointVisit"
            },
        ];
        return (
            <Layout className={style.pageContainer}>
                <Sider collapsible trigger={null}>
                    <Menu theme={'light'} className={style.menu}>
                        {
                            menuList.map((item: any, index: number) => {
                                if (item.auth) {
                                    return (
                                        <Menu.Item>
                                            <Button
                                                className={selectedMenuIndex === index ? style.classHomeWorkActive : style.classHomeWork}
                                                onClick={() => {
                                                    this.setState({
                                                        selectedMenuIndex: index
                                                    })
                                                }}>{item.navText}</Button>
                                        </Menu.Item>
                                    )
                                }
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Content className={style.content}>
                        {menuList[selectedMenuIndex].component}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
