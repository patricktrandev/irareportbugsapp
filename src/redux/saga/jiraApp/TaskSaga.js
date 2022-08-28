import { call, put, select, takeLatest } from "redux-saga/effects";
import { CHANGE_ASSIGNEE_TASK_MODAL, CHANGE_TASK_MODAL, CREATE_NEW_TASK, CREATE_NEW_TASK_REDUCER, DELETE_TASK, GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_REDUCER, HANDLE_CHANGE_TASK_MODAL, TASK_DETAILS, TASK_DETAILS_REDUCER, UPDATE_TASK_MODAL, UPDATE_TASK_MODAL_REDUCER, UPDATE_TASK_STATUS } from "../../constant/TaskConstant";
import { jiraBugsService } from '../../../services/JiraBugsServices'
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constant/LoadingConstant";
import { STATUS_CODE } from "../../../utils/GlobalSettings/systemSetting";
import { GET_ALL_PROJECT, GET_PROJECT_DETAILS } from "../../constant/ProjectConstant";
import { CLOSE_DRAWER } from "../../constant/ModalConstant";

import { notifyFunc } from '../../../utils/NotifyJira'
import { REMOVE_USER_ASSIGN_TASK } from "../../constant/UserConstant";
function* getAllTypeOfTask(action) {

    try {
        const { data, status } = yield call(() => jiraBugsService.getAllTaskType())

        yield put({
            type: GET_ALL_TASK_TYPE_REDUCER,
            taskType: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* getAllTypeOfTaskActionSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE, getAllTypeOfTask)
}

function* createNewtask(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    try {

        const { data, status } = yield call(() => jiraBugsService.createTaskAuthorize(action.newTask))
        if (status === STATUS_CODE.SUCCESS) {
            // console.log('successfully create...')
            // console.log(data)
            notifyFunc('success', 'Create Task Successfully')
            // yield put({
            //     type: GET_ALL_PROJECT
            // })

            yield put({
                type: CLOSE_DRAWER
            })
        }


    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* createNewTaskActionSaga() {
    yield takeLatest(CREATE_NEW_TASK, createNewtask)
}


function* getTaskDetails(action) {

    try {

        const { data, status } = yield call(() => jiraBugsService.getTaskDetailsAuthorize(action.taskId))
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: TASK_DETAILS_REDUCER,
                taskModel: data.content
            })
            // yield put({
            //     type: CLOSE_DRAWER
            // })
        }


    } catch (err) {
        console.log(err)
    }


}

export function* getTaskDetailsActionSaga() {
    yield takeLatest(TASK_DETAILS, getTaskDetails)
}

function* updateTaskStatus(action) {

    try {
        console.log("94", action)

        const { data, status } = yield call(() => jiraBugsService.updateTaskStatusAuthorize(action.taskId, action.statusId))
        console.log("97", status)
        if (status === STATUS_CODE.SUCCESS) {

            console.log(data)

            yield put({
                type: GET_PROJECT_DETAILS,
                projectId: action.projectId
            })
            // yield put({
            //     type: TASK_DETAILS,
            //     taskId: action.taskId
            // })

        }


    } catch (err) {
        console.log(err)
    }

}

export function* updateTaskStatusActionSaga() {
    yield takeLatest(UPDATE_TASK_STATUS, updateTaskStatus)
}


function* updateTaskModal(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        //console.log("94", action)

        const { data, status } = yield call(() => jiraBugsService.updateTaskModalAuthorize(action.updatedTaskModal))
        //console.log("97", status)
        if (status === STATUS_CODE.SUCCESS) {
            console.log('update task successfully')
            console.log(data)


            yield put({
                type: GET_PROJECT_DETAILS,
                projectId: data.content.projectId
            })
            yield put({
                type: TASK_DETAILS,
                taskId: data.content.taskId
            })
            notifyFunc('success', 'Update Task successfully', '')
        }


    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* updateTaskModalActionSaga() {
    yield takeLatest(UPDATE_TASK_MODAL, updateTaskModal)
}

function* handleChangeTaskModal(action) {

    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            yield put({
                type: CHANGE_TASK_MODAL,
                name: action.name,
                value: action.value
            })
        };
            break;
        case CHANGE_ASSIGNEE_TASK_MODAL: {

            yield put({
                type: CHANGE_ASSIGNEE_TASK_MODAL,
                userSelect: action.userSelect
            })
        } break;
        case REMOVE_USER_ASSIGN_TASK: {
            yield put({
                type: REMOVE_USER_ASSIGN_TASK,
                userId: action.userId
            })
        } break;
        default:
    }

    let { taskDetailsModal } = yield select(state => state.TaskDetailsReducer)

    let listUsersAssign = taskDetailsModal.assigness?.map((user, index) => {
        return user.id
    })

    taskDetailsModal = { ...taskDetailsModal, listUserAsign: listUsersAssign }

    yield put({
        type: UPDATE_TASK_MODAL,
        updatedTaskModal: taskDetailsModal
    })
}

export function* handleChangeTaskModalActionSaga() {
    yield takeLatest(HANDLE_CHANGE_TASK_MODAL, handleChangeTaskModal)
}




function* deleteTaskModal(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        console.log("94", action)

        const { data, status } = yield call(() => jiraBugsService.deleteTaskModalAuthorize(action.taskId))
        //console.log("97", status)
        if (status === STATUS_CODE.SUCCESS) {

            console.log(data)


            yield put({
                type: GET_PROJECT_DETAILS,
                projectId: action.projectId
            })
            notifyFunc('success', 'Delete Task successfully', '')

        }


    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* deleteTaskModalActionSaga() {
    yield takeLatest(DELETE_TASK, deleteTaskModal)
}