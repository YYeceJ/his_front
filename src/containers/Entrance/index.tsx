import React from "react";
import {Button, Modal} from "antd";
import style from  './style.scss';

export interface EntranceOwnProps {
    route?: any;
    history?:any;
}

export interface EntranceStateProps {
}

export interface EntranceState {
}

export class Entrance extends React.Component<EntranceStateProps & EntranceOwnProps, EntranceState> {
    constructor(props: EntranceStateProps & EntranceOwnProps) {
        super(props);
    }

    EnterLogin = (identity: string) => {
        if (identity === "patient") {
            localStorage.setItem("identity", "patient");

        }
        if (identity === "doctor") {
            localStorage.setItem("identity", "doctor");
        }
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className={style.page}>
                <Button onClick={() => this.EnterLogin("patient")} className={style.patient}>公众版入口</Button>
                <br/>
                <Button onClick={() => this.EnterLogin("doctor")} className={style.doctor}> 员工版入口 </Button>
            </div>
        );
    }
}
