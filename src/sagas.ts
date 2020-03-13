import { all, fork } from 'redux-saga/effects';
import saga from './containers/Team3/sagas';
import team4Saga from './containers/Team4/sagas';
import doctorDepartmentSagas from "./containers/DoctorManagement/sagas";
import departmentDepartmentSagas from "./containers/DepartmentManagement/sagas";
import patientInfoManagementSagas from "./containers/PatientInfoManagement/sagas";
import consultingRoomManagementSagas from "./containers/ConsultingRoomManagement/sagas";
import schedulingManagementSagas from "./containers/SchedulingManagement/sagas";
import doctorScheduleSagas from "./containers/DoctorSchedule/sagas";
import patientInfoSagas from "./containers/PatientInfo/sagas";
import visitRecordSagas from "./containers/VisitRecord/sagas";

export default function* rootSaga() {
    yield all([
        fork(saga),
        fork(doctorDepartmentSagas),
        fork(departmentDepartmentSagas),
        fork(patientInfoManagementSagas),
        fork(consultingRoomManagementSagas),
        fork(schedulingManagementSagas),
        fork(doctorScheduleSagas),
        fork(patientInfoSagas),
        fork(visitRecordSagas),
        // fork(team4Saga)
    ]);
};
