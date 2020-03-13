import React from "react";
import { Welcome } from './containers/Welcome';
import { NoMatch } from './containers/NoMatch';
import { Tom } from './containers/Tom';
import { Bill } from './containers/Bill';
import Team1 from './containers/Team1';
import Team2 from './containers/Team2';
import Team3 from './containers/Team3';
// import Team4 from './containers/Team4';
import Team5 from './containers/Team5';

import Bundle from './utils/Bundle';
import {DoctorManagementForm} from "./containers/DoctorManagement";
import {DepartmentManagementForm} from "./containers/DepartmentManagement";
import {PatientInfoManagementForm} from "./containers/PatientInfoManagement";
import {ConsultingRoomManagementForm} from "./containers/ConsultingRoomManagement";
import {SchedulingManagementForm} from "./containers/SchedulingManagement";
import {DoctorScheduleForm} from "./containers/DoctorSchedule";
import {PatientInfoForm} from "./containers/PatientInfo";
import {VisitRecordForm} from "./containers/VisitRecord";
import {AppointVisitForm} from "./containers/AppointVisit";

export default function createRoutes() {
    return [
        {
            path: "/",
            component: Welcome,
            exact: true
        },
        {
            path: "/user/tom",
            component: Tom
        },
        {
            path: "/user/bill",
            component: Bill
        },
        {
            path: "/user/alex",
            render: () => {
                return <Bundle load={ Promise.all([
                    import('./containers/Alex')
                ]) }/>
            }
        },
        {
            path: "/team/team1",
            component: Team1
        },
        {
            path: "/team/team2",
            component: Team2
        },
        {
            path: "/team/team3",
            component: Team3
        },
        {
            path: "/team/team4",
            render: () => {
                return <Bundle load={ Promise.all([
                    import('./containers/Team4'),
                    import('./containers/Team4/reducer'),
                    import('./containers/Team4/sagas')
                ]) }/>
            }
            // component: Team4
        },
        {
            path: "/team/team5",
            component: Team5
        },
        {
            path: "/doctorManagement",
            component: DoctorManagementForm
        },
        {
            path: "/departmentManagement",
            component: DepartmentManagementForm
        },
        {
            path: "/patientInfoManagement",
            component: PatientInfoManagementForm
        },
        {
            path: "/ConsultingRoomManagement",
            component: ConsultingRoomManagementForm
        },
        {
            path: "/SchedulingManagement",
            component: SchedulingManagementForm
        },
        {
            path: "/DoctorSchedule",
            component: DoctorScheduleForm
        },
        {
            path: "/PatientInfo",
            component: PatientInfoForm
        },
        {
            path: "/VisitRecord",
            component: VisitRecordForm
        },
        {
            path: "/AppointVisit",
            component: AppointVisitForm
        }
    ];
}
