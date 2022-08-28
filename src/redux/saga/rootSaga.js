import { all } from 'redux-saga/effects'
import { signInAction, searchByKeyAction, assignUserToProjectAction, deleteUserInProjectAction, getUserByProjectActionSaga, getAllUsersActionSaga } from './jiraApp/UserBugsSaga'
import { getAllProjectCategorySaga } from './jiraApp/projectCategorySaga'
import {
    createProjectActionSaga,
    getAllProjectActionSaga,
    updateProjectActionSaga,
    deleteProjectActionSaga,
    getProjectDetailsActionSaga,
    getAllProjectDropdownActionSaga,

} from './jiraApp/ProjectSaga'
import {
    getAllTypeOfTaskActionSaga,
    createNewTaskActionSaga,
    getTaskDetailsActionSaga,
    updateTaskStatusActionSaga,
    handleChangeTaskModalActionSaga,
    updateTaskModalActionSaga,
    deleteTaskModalActionSaga
} from './jiraApp/TaskSaga'
import { getAllPriorityActionSaga } from './jiraApp/PrioritySaga'
import { getAllStatusActionSaga } from './jiraApp/StatusSaga'
import {
    getAllCommentsActionSaga,
    addNewCommentActionSaga,
    editCommentActionSaga,
    deleteCommentActionSaga
} from './jiraApp/CommentSaga'
export function* rootSaga() {
    yield all([
        signInAction(),
        getAllProjectCategorySaga(),
        createProjectActionSaga(),
        getAllProjectActionSaga(),
        updateProjectActionSaga(),
        deleteProjectActionSaga(),
        searchByKeyAction(),
        assignUserToProjectAction(),
        deleteUserInProjectAction(),
        getProjectDetailsActionSaga(),
        getAllProjectDropdownActionSaga(),
        getAllTypeOfTaskActionSaga(),
        getAllPriorityActionSaga(),
        createNewTaskActionSaga(),
        getAllStatusActionSaga(),
        getUserByProjectActionSaga(),
        getTaskDetailsActionSaga(),
        updateTaskStatusActionSaga(),
        handleChangeTaskModalActionSaga(),
        updateTaskModalActionSaga(),
        deleteTaskModalActionSaga(),
        getAllUsersActionSaga(),
        getAllCommentsActionSaga(),
        addNewCommentActionSaga(),
        editCommentActionSaga(),
        deleteCommentActionSaga()
    ])
}