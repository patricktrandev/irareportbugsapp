import { call, put, takeLatest } from "redux-saga/effects";

import { jiraBugsService } from '../../../services/JiraBugsServices'
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_REDUCER } from "../../constant/PriorityConstant";


function* getAllPriorityAction(action) {

    try {
        const { data, status } = yield call(() => jiraBugsService.getTaskPriority(0))

        yield put({
            type: GET_ALL_PRIORITY_REDUCER,
            data: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* getAllPriorityActionSaga() {
    yield takeLatest(GET_ALL_PRIORITY, getAllPriorityAction)
}
