import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Switch } from 'react-router';
import { BrowserRouter, Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect, MapStateToProps } from 'react-redux';

import { NoMatch } from '../NoMatch';

import createRoutes from '../../routes';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export interface MainPageOwnProps { }

export interface MainPageStateProps { }

export interface MainPageState { collapsed: boolean, mode: any }

export class MainPage extends React.Component<MainPageStateProps & MainPageOwnProps, MainPageState> {

    allRoutes: Array<{ path: string, component?: any, exact?: Boolean, render?: (props: RouteComponentProps<any>) => React.ReactNode }>;

    constructor(props: MainPageStateProps & MainPageOwnProps) {
        super(props);
        this.state = { collapsed: false, mode: 'inline' };
        this.toggle = this.toggle.bind(this);
        this.generateRoutes = this.generateRoutes.bind(this);
        this.allRoutes = createRoutes();
    }

    toggle() {
        this.setState({
            mode: !this.state.collapsed ? 'vertical' : 'inline',
        });
    }

    generateRoutes() {
        return this.allRoutes.map((route, index) => {
            if (route.component != undefined) {
                if ( route.exact ) {
                    return <Route key={'ru_' + index} exact path={route.path} component={route.component}/>;
                } else {
                    return <Route key={'ru_' + index} path={route.path} component={route.component}/>;
                }
            } else if(route.render != undefined) {
                if ( route.exact ) {
                    return <Route key={'ru_' + index} exact path={route.path} render={route.render}/>;
                } else {
                    return <Route key={'ru_' + index} path={route.path} render={route.render}/>;
                }
            }
        })
    }

    render() {
        const routes = this.generateRoutes();
        console.log("----mainpage----");
        return (
            <Layout>
                <Sider collapsible trigger={null} collapsed={this.state.collapsed} >
                    <div className="logo" />
                    <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['home']}>
                        <Menu.Item key="home" >
                            <Link to="/"><Icon type="home" /><span className="nav-text">Home</span></Link>
                        </Menu.Item>
                        <Menu.Item key="doctorManagement">
                            <Link to="/doctorManagement"><span className="nav-text">医生管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="departmentManagement">
                            <Link to="/departmentManagement"><span className="nav-text">科室管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="patientInfoManagement">
                            <Link to="/patientInfoManagement"><span className="nav-text">患者信息管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="ConsultingRoomManagement">
                            <Link to="/ConsultingRoomManagement"><span className="nav-text">诊室管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="SchedulingManagement">
                            <Link to="/SchedulingManagement"><span className="nav-text">排班管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="DoctorSchedule">
                            <Link to="/DoctorSchedule"><span className="nav-text">我的排班</span></Link>
                        </Menu.Item>
                        <Menu.Item key="PatientInfo">
                            <Link to="/PatientInfo"><span className="nav-text">个人信息管理</span></Link>
                        </Menu.Item>
                        <Menu.Item key="VisitRecord">
                            <Link to="/VisitRecord"><span className="nav-text">就诊记录</span></Link>
                        </Menu.Item>
                        <Menu.Item key="AppointVisit">
                            <Link to="/AppointVisit"><span className="nav-text">预约就诊</span></Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
             </Layout>
        );
    }
}
