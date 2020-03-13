import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Switch } from 'react-router';
import { BrowserRouter, Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect, MapStateToProps } from 'react-redux';

import { NoMatch } from '../NoMatch';

import createRoutes from '../../routes';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export interface RootContainerOwnProps { }

export interface RootContainerStateProps { }

export interface RootContainerState { collapsed: boolean, mode: any }

export class RootContainer extends React.Component<RootContainerStateProps & RootContainerOwnProps, RootContainerState> {

    allRoutes: Array<{ path: string, component?: any, exact?: Boolean, render?: (props: RouteComponentProps<any>) => React.ReactNode }>;

    constructor(props: RootContainerStateProps & RootContainerOwnProps) {
        super(props);
        this.state = { collapsed: false, mode: 'inline' };
        this.toggle = this.toggle.bind(this);
        this.generateRoutes = this.generateRoutes.bind(this);
        this.allRoutes = createRoutes();
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
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
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                    </Header>

                    <Content style={{ margin: '0 16px' }}>
                        { React.createElement(Switch, null, [...routes, <Route key='ru_nomatch' component={NoMatch}/>]) }

                    </Content>
                </Layout>
             </Layout>
        );
    }
}
