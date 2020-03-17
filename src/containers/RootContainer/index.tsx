import React from "react";
import {Redirect, Switch} from "react-router";
import {Link, Route, RouteComponentProps} from "react-router-dom";
import {Modal} from "antd";
import style from "./style.scss";

import createRoutes from "../../routes";

const failedIcon = require("../../images/Common/failed_icon.png");

export interface RootContainerOwnProps {
    route?: any;
}

export interface RootContainerStateProps {
}

export interface RootContainerState {
}

export class RootContainer extends React.Component<RootContainerStateProps & RootContainerOwnProps, RootContainerState> {

    allRoutes: Array<{ path: string, component?: any, exact?: Boolean, render?: (props: RouteComponentProps<any>) => React.ReactNode }>;
    private exitModal: any;// 关闭弹窗

    constructor(props: RootContainerStateProps & RootContainerOwnProps) {
        super(props);
        this.generateRoutes = this.generateRoutes.bind(this);
        this.allRoutes = createRoutes();
    }

    generateRoutes() {
        return this.allRoutes.map((route, index) => {
            if (route.component !== undefined) {
                if (route.exact) {
                    return <Route key={`ru_${index}`} exact path={route.path} component={route.component}/>;
                } else {
                    return <Route key={`ru_${index}`} path={route.path} component={route.component}/>;
                }
            } else if (route.render !== undefined) {
                if (route.exact) {
                    return <Route key={`ru_${index}`} exact path={route.path} render={route.render}/>;
                } else {
                    return <Route key={`ru_${index}`} path={route.path} render={route.render}/>;
                }
            }
        });
    }

    render() {
        const routes = this.generateRoutes();
        return (
            <Switch>
                {
                    [...routes, <Redirect key="Entrance" to="/Entrance" />]
                }
            </Switch>
        );
    }
}
