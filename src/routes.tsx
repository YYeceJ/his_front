import React from "react";
import {DoctorManagementForm} from "./containers/DoctorManagement";
import {DepartmentManagementForm} from "./containers/DepartmentManagement";
import {PatientInfoManagementForm} from "./containers/PatientInfoManagement";
import {ConsultingRoomManagementForm} from "./containers/ConsultingRoomManagement";
import {SchedulingManagementForm} from "./containers/SchedulingManagement";
import {DoctorScheduleForm} from "./containers/DoctorSchedule";
import {PatientInfoForm} from "./containers/PatientInfo";
import {VisitRecordForm} from "./containers/VisitRecord";
import {AppointVisitForm} from "./containers/AppointVisit";
import Login from "./containers/Login";
import {MainPage} from "./containers/MainPage";

export default function createRoutes() {
    return [
        {
            path: "/doctorManagement",
            component: DoctorManagementForm,
            exact: true
        },
        {
            path: "/departmentManagement",
            component: DepartmentManagementForm,
            exact: true
        },
        {
            path: "/patientInfoManagement",
            component: PatientInfoManagementForm,
            exact: true
        },
        {
            path: "/ConsultingRoomManagement",
            component: ConsultingRoomManagementForm,
            exact: true
        },
        {
            path: "/SchedulingManagement",
            component: SchedulingManagementForm,
            exact: true
        },
        {
            path: "/DoctorSchedule",
            component: DoctorScheduleForm,
            exact: true
        },
        {
            path: "/PatientInfo",
            component: PatientInfoForm,
            exact: true
        },
        {
            path: "/VisitRecord",
            component: VisitRecordForm,
            exact: true
        },
        {
            path: "/AppointVisit",
            component: AppointVisitForm,
            exact: true
        },
        {
            path: "/login",
            component: Login,
            exact: true
        },
        {
            path: "/MainPage",
            component: MainPage,
            exact: true
        }
    ];
}
