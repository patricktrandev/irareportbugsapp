import { call, put, takeLatest } from "redux-saga/effects";

import { jiraBugsService } from '../../../services/JiraBugsServices'
import { GET_ALL_STATUS, GET_ALL_STATUS_REDUCER } from "../../constant/StatusConstant";



function* getAllStatusAction(action) {

    try {
        const { data, status } = yield call(() => jiraBugsService.getAllStatus())

        yield put({
            type: GET_ALL_STATUS_REDUCER,
            data: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* getAllStatusActionSaga() {
    yield takeLatest(GET_ALL_STATUS, getAllStatusAction)
}
