import { call, put, takeLatest } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import { CREATE_PROJECT, GET_ALL_PROJECT_REDUCER, GET_ALL_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, GET_PROJECT_DETAILS, GET_PROJECT_DETAILS_REDUCER, GET_ALL_PROJECT_DROPDOWN_REDUCER, GET_ALL_PROJECT_DROPDOWN } from '../../constant/ProjectConstant'
import { jiraBugsService } from '../../../services/JiraBugsServices'
import { STATUS_CODE } from '../../../utils/GlobalSettings/systemSetting'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constant/LoadingConstant'
import { CLOSE_DRAWER } from '../../constant/ModalConstant'
import { notifyFunc } from '../../../utils/NotifyJira'
import { GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_REDUCER } from "../../constant/UserConstant";
function* createProjectAction(action) {
    // console.log('action create project', action)
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => jiraBugsService.createProjectAuthorize(action.newProject))
        if (status === STATUS_CODE.SUCCESS) {
            console.log('successfully create...')
            let history = yield select(state => state.historyReducer.history)
            history.push('/projects')
        }

    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* createProjectActionSaga() {
    yield takeLatest(CREATE_PROJECT, createProjectAction)
}

function* getAllProjectAction(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => jiraBugsService.getAllProjectAuthorize())
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_PROJECT_REDUCER,
                data: data.content
            })
            yield put({
                type: GET_USER_BY_PROJECT,
                keyword: data.content[0].id
            })
        }

    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* getAllProjectActionSaga() {
    yield takeLatest(GET_ALL_PROJECT, getAllProjectAction)
}

function* getAllProjectDropDownAction(action) {


    try {
        const { data, status } = yield call(() => jiraBugsService.getAllProjectAuthorize())
        console.log(data)
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_PROJECT_DROPDOWN_REDUCER,
                data: data.content
            })

        }

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* getAllProjectDropdownActionSaga() {
    yield takeLatest(GET_ALL_PROJECT_DROPDOWN, getAllProjectDropDownAction)
}


function* updateProjectAction(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => jiraBugsService.updateProjectAuthorize(action.projectUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            console.log('successfully create...')
            console.log(data)
            yield put({
                type: GET_ALL_PROJECT
            })
            yield put({
                type: CLOSE_DRAWER
            })
        }

    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* updateProjectActionSaga() {
    yield takeLatest(UPDATE_PROJECT, updateProjectAction)
}
function* deletProjectAction(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { data, status } = yield call(() => jiraBugsService.deleteProjectAuthorize(action.projectId))
        if (status === STATUS_CODE.SUCCESS) {
            console.log('successfully delete...')
            notifyFunc('success', 'Delete project successfully', '')





        } else {
            notifyFunc('error', 'Failed To Delete', '')
        }
        yield put({
            type: GET_ALL_PROJECT
        })
    } catch (err) {
        notifyFunc('error', 'Failed To Delete', '')
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* deleteProjectActionSaga() {
    yield takeLatest(DELETE_PROJECT, deletProjectAction)
}

function* getProjectDetailsAction(action) {

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        const { data, status } = yield call(() => jiraBugsService.getProjectDetailsAuthorize(action.projectId))
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_PROJECT_DETAILS_REDUCER,
                projectDetails: data.content
            })
            // yield put({
            //     type: CLOSE_DRAWER
            // })
        }

    } catch (err) {
        console.log(err.response.data)
        let history = yield select(state => state.historyReducer.history)
        history.push('/projects')
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* getProjectDetailsActionSaga() {
    yield takeLatest(GET_PROJECT_DETAILS, getProjectDetailsAction)
}