import { all, fork } from 'redux-saga/effects';
import saga from './containers/Team3/sagas';
import team4Saga from './containers/Team4/sagas';
import doctorDepartmentSagas from "./containers/DoctorManagement/sagas";

export default function* rootSaga() {
    yield all([
        fork(saga),
        fork(doctorDepartmentSagas),
        // fork(team4Saga)
    ]);
};
