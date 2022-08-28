import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PROJECT_CATEGORY, GET_PROJECT_CATEGORY_REDUCER } from '../../constant/ProjectConstant'
import { jiraBugsService } from '../../../services/JiraBugsServices'
import { STATUS_CODE } from '../../../utils/GlobalSettings/systemSetting'
function* getAllProjectCategoryAction() {
    try {
        const { data, status } = yield call(() => jiraBugsService.getAllProjectCategory())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_CATEGORY_REDUCER,
                content: data.content
            })
        }

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* getAllProjectCategorySaga() {
    yield takeLatest(GET_PROJECT_CATEGORY, getAllProjectCategoryAction)
}

