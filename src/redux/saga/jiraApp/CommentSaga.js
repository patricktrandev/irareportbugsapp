import { call, put, takeLatest } from 'redux-saga/effects'
import { jiraBugsService } from '../../../services/JiraBugsServices'
import { STATUS_CODE } from '../../../utils/GlobalSettings/systemSetting'
import { ADD_NEW_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_ALL_COMMENT, GET_ALL_COMMENT_REDUCER } from '../../constant/CommentConstant'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constant/LoadingConstant'
import { TASK_DETAILS } from '../../constant/TaskConstant'
import { notifyFunc } from '../../../utils/NotifyJira'
function* getAllComments(action) {

    try {

        const { data, status } = yield call(() => jiraBugsService.getAllComments(action.taskId))
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_COMMENT_REDUCER,
                comments: data.content
            })

        }


    } catch (err) {
        console.log(err)
    }


}

export function* getAllCommentsActionSaga() {
    yield takeLatest(GET_ALL_COMMENT, getAllComments)
}

function* addNewComment(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    try {

        const newComment = {
            taskId: action.taskId,
            contentComment: action.comment
        }
        const { data, status } = yield call(() => jiraBugsService.addNewCommentAuthorize(newComment))
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_COMMENT,
                taskId: action.taskId
            })
            yield put({
                type: TASK_DETAILS,
                taskId: action.taskId
            })


        }


    } catch (err) {
        console.log(err)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* addNewCommentActionSaga() {
    yield takeLatest(ADD_NEW_COMMENT, addNewComment)
}


function* editCommentAction(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    try {


        const { data, status } = yield call(() => jiraBugsService.editCommentAuthorize(action.commentId, action.comment))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
            yield put({
                type: GET_ALL_COMMENT,
                taskId: action.taskId
            })
            yield put({
                type: TASK_DETAILS,
                taskId: action.taskId
            })


        }


    } catch (err) {
        console.log(err)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* editCommentActionSaga() {
    yield takeLatest(EDIT_COMMENT, editCommentAction)
}

function* deleteCommentAction(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    try {
        console.log(action)

        const { data, status } = yield call(() => jiraBugsService.deleteCommentAuthorize(action.commentId))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
            yield put({
                type: GET_ALL_COMMENT,
                taskId: action.taskId
            })
            yield put({
                type: TASK_DETAILS,
                taskId: action.taskId
            })
            notifyFunc('success', 'Delete comment successfully', '')

        }


    } catch (err) {
        console.log(err)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* deleteCommentActionSaga() {
    yield takeLatest(DELETE_COMMENT, deleteCommentAction)
}