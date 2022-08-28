import { USER_SIGNIN_API, USER_LOGIN_INFO, USER_SEARCH_BY_KEY, ASSIGN_USER_PROJECT, DELETE_USER_PROJECT, GET_USER_BY_PROJECT, REMOVE_USER_ASSIGN_TASK, GET_ALL_USERS_REDUCER, GET_ALL_USERS } from "../constant/UserConstant"
import { GET_PROJECT_CATEGORY, CREATE_PROJECT, GET_ALL_PROJECT, EDIT_PROJECT_REDUCER, UPDATE_PROJECT, DELETE_PROJECT, GET_PROJECT_DETAILS, GET_ALL_PROJECT_DROPDOWN } from '../constant/ProjectConstant'
import { OPEN_DRAWER, CLOSE_DRAWER, OPEN_FORM_EDIT_PROJECT, SUBMIT_FORM_EDIT_PROJECT, OPEN_FORM_CREATE_TASK } from '../constant/ModalConstant'
import { DELETE_TASK, GET_ALL_TASK_TYPE, TASK_DETAILS, TASK_DETAILS_REDUCER, UPDATE_TASK_STATUS } from "../constant/TaskConstant"
import { GET_ALL_PRIORITY } from "../constant/PriorityConstant"
import { GET_ALL_STATUS } from "../constant/StatusConstant"
import { ADD_NEW_COMMENT, DELETE_COMMENT, GET_ALL_COMMENT } from "../constant/CommentConstant"
export const signinJiraAction = (email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email,
            password,

        }
    }
}

export const historyAction = (history) => {
    return {
        type: 'ADD_HISTORY',
        history: history
    }
}

export const userLoginAction = (userLogin) => {
    return {
        type: USER_LOGIN_INFO,
        userLogin
    }
}
export const getProjectCategoryActionDispatch = () => {
    return {
        type: GET_PROJECT_CATEGORY,
    }
}

export const createProjectActionDispatchSaga = (data) => {
    return {
        type: CREATE_PROJECT,
        newProject: data
    }
}


export const getAllProjectActionDispatchSaga = (data) => {
    return {
        type: GET_ALL_PROJECT,
        newProject: data
    }
}
export const getAllProjectDropDownActionDispatchSaga = () => {
    return {
        type: GET_ALL_PROJECT_DROPDOWN,
    }
}
export const openModalActionDispatchReducer = () => {
    return {
        type: OPEN_DRAWER,
    }
}
export const closeModalActionDispatchReducer = () => {
    return {
        type: CLOSE_DRAWER,
    }
}
export const openFormModalActionDispatchReducer = (newComponent) => {

    return {
        type: OPEN_FORM_EDIT_PROJECT,
        titleProject: 'Edit Project',
        newComponent
    }
}
export const openFormCreateTaskModalActionDispatchReducer = (newComponent) => {

    return {
        type: OPEN_FORM_CREATE_TASK,
        titleProject: 'Create New Task',
        newComponent
    }
}
export const submitFormModalActionDispatchReducer = (submitFunc) => {
    return {
        type: SUBMIT_FORM_EDIT_PROJECT,
        submitFunc
    }
}

export const loadingDataIntoFormModalActionDispatchReducer = (record) => {
    return {
        type: EDIT_PROJECT_REDUCER,
        record
    }
}
export const updateProjectActionToSaga = (projectUpdate) => {
    return {
        type: UPDATE_PROJECT,
        projectUpdate
    }
}
export const deleteProjectActionToSaga = (projectId) => {
    return {
        type: DELETE_PROJECT,
        projectId
    }
}

export const userSearchActionToSaga = (keyword) => {
    return {
        type: USER_SEARCH_BY_KEY,
        keyword
    }
}

export const assignUserActionToSaga = (userId, projectId) => {
    let userProject = {
        userId,
        projectId
    }
    console.log(userProject)
    return {
        type: ASSIGN_USER_PROJECT,
        userProject
    }
}
export const deleteUserInProjectActionToSaga = (userId, projectId) => {
    let userProject = {
        userId,
        projectId
    }
    console.log(userProject)
    return {
        type: DELETE_USER_PROJECT,
        userProject
    }
}

export const getProjectDetailsActionToSaga = (projectId) => {
    return {
        type: GET_PROJECT_DETAILS,
        projectId
    }
}

export const getUserByProjectActionToSaga = (keyword) => {
    return {
        type: GET_USER_BY_PROJECT,
        keyword
    }
}
export const getAllUserWithKeywordActionToSaga = (keyword) => {
    return {
        type: GET_ALL_USERS,
        keyword
    }
}
///TASK


export const getAlltaskTypeActionSaga = () => {
    return {
        type: GET_ALL_TASK_TYPE
    }
}
export const getTaskDetailsActionSaga = (id) => {
    return {
        type: TASK_DETAILS,
        taskId: id
    }
}
export const updatetaskStatusActionSaga = (taskId, statusId, projectId) => {
    return {
        type: UPDATE_TASK_STATUS,
        taskId,
        statusId,
        projectId
    }
}
export const removeUserActionReducer = (userId) => {
    return {
        type: REMOVE_USER_ASSIGN_TASK,
        userId
    }
}

export const deleteTaskActionSaga = (projectId, taskId) => {
    return {
        type: DELETE_TASK,
        projectId,
        taskId
    }
}
///PRIORITY
export const getAllTaskPriorityActionSaga = () => {
    return {
        type: GET_ALL_PRIORITY
    }
}

//STATUS
export const getAllStatusActionSaga = () => {
    return {
        type: GET_ALL_STATUS
    }
}


//COMMENT
export const getAllCommentsActionSaga = (taskId) => {
    return {
        type: GET_ALL_COMMENT,
        taskId
    }
}
export const addNewCommentActionSaga = (taskId, comment) => {
    return {
        type: ADD_NEW_COMMENT,
        taskId,
        comment
    }
}

export const editCommentActionSaga = (taskId, comment, commentId) => {
    return {
        type: ADD_NEW_COMMENT,
        taskId,
        comment,
        commentId
    }
}
export const deleteCommentActionSaga = (commentId, taskId) => {
    return {
        type: DELETE_COMMENT,
        commentId,
        taskId
    }
}