import { takeLatest, take, call, delay, put } from "redux-saga/effects";
import { push } from 'react-router-redux'
import { USER_SIGNIN_API, USER_SEARCH_BY_KEY, GET_USER_SEARCH_REDUCER, ASSIGN_USER_PROJECT, DELETE_USER_PROJECT, GET_USER_BY_PROJECT_REDUCER, GET_USER_BY_PROJECT, GET_ALL_USERS, GET_ALL_USERS_REDUCER } from '../../constant/UserConstant'
import { jiraBugsService } from '../../../services/JiraBugsServices'
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../utils/GlobalSettings/systemSetting'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constant/LoadingConstant'
import { select } from "redux-saga/effects";
import { userLoginAction } from '../../actions/JiraBugsAction'
import { GET_ALL_PROJECT } from "../../constant/ProjectConstant";
function* signin(action) {
    console.log("action", action)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {


        const { data, status } = yield call(() => jiraBugsService.signInJira(action.userLogin))
        console.log(data)
        // if(status= STATUS_CODE.SUCCESS){

        // }
        console.log('access token -', data.content.accessToken)

        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))


        yield put(userLoginAction(data.content))

        let history = yield select(state => state.historyReducer.history)
        history.push('/projects')

    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* signInAction() {
    yield takeLatest(USER_SIGNIN_API, signin)
}

function* searchByKey(action) {

    try {


        const { data, status } = yield call(() => jiraBugsService.getUser(action.keyword))

        yield put({
            type: GET_USER_SEARCH_REDUCER,
            listUserSearch: data.content
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* searchByKeyAction() {
    yield takeLatest(USER_SEARCH_BY_KEY, searchByKey)
}

function* assignUserToProject(action) {

    try {

        console.log(action)
        const { data, status } = yield call(() => jiraBugsService.assignUserToProject(action.userProject))

        console.log(data)

        yield put({
            type: GET_ALL_PROJECT
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* assignUserToProjectAction() {
    yield takeLatest(ASSIGN_USER_PROJECT, assignUserToProject)
}
function* deleteUserFromProjectSaga(action) {

    try {

        console.log(action)
        const { data, status } = yield call(() => jiraBugsService.deleteUserFromProject(action.userProject))

        console.log(data)

        yield put({
            type: GET_ALL_PROJECT
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* deleteUserInProjectAction() {
    yield takeLatest(DELETE_USER_PROJECT, deleteUserFromProjectSaga)
}


function* getUserByProject(action) {


    try {

        const { data, status } = yield call(() => jiraBugsService.getUserByProject(action.keyword))

        yield put({
            type: GET_USER_BY_PROJECT_REDUCER,
            listUserByProject: data.content
        })

    } catch (err) {
        console.log(err)
        console.log(err.response?.data)
    }


}

export function* getUserByProjectActionSaga() {
    yield takeLatest(GET_USER_BY_PROJECT, getUserByProject)
}


function* getAllUsers(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)

    try {

        const { data, status } = yield call(() => jiraBugsService.getAllUser(action.keyword))
        console.log("149", data)


        yield put({
            type: GET_ALL_USERS_REDUCER,
            users: data.content
        })

    } catch (err) {
        console.log(err)
        console.log(err.response?.data)
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* getAllUsersActionSaga() {
    yield takeLatest(GET_ALL_USERS, getAllUsers)
}