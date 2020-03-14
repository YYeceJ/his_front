import { all, fork } from 'redux-saga/effects';
import doctorDepartmentSagas from "./containers/DoctorManagement/sagas";
import departmentDepartmentSagas from "./containers/DepartmentManagement/sagas";
import patientInfoManagementSagas from "./containers/PatientInfoManagement/sagas";
import consultingRoomManagementSagas from "./containers/ConsultingRoomManagement/sagas";
import schedulingManagementSagas from "./containers/SchedulingManagement/sagas";
import doctorScheduleSagas from "./containers/DoctorSchedule/sagas";
import patientInfoSagas from "./containers/PatientInfo/sagas";
import visitRecordSagas from "./containers/VisitRecord/sagas";
import loginSagas from "./containers/Login/sagas";

export default function* rootSaga() {
    yield all([
        fork(doctorDepartmentSagas),
        fork(departmentDepartmentSagas),
        fork(patientInfoManagementSagas),
        fork(consultingRoomManagementSagas),
        fork(schedulingManagementSagas),
        fork(doctorScheduleSagas),
        fork(patientInfoSagas),
        fork(visitRecordSagas),
        fork(loginSagas),
        // fork(team4Saga)
    ]);
};
