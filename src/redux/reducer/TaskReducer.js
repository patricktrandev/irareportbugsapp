import { CHANGE_ASSIGNEE_TASK_MODAL, CHANGE_TASK_MODAL, CREATE_NEW_TASK_REDUCER, GET_ALL_TASK_TYPE_REDUCER, TASK_DETAILS_REDUCER } from "../constant/TaskConstant"
import { REMOVE_USER_ASSIGN_TASK } from "../constant/UserConstant"

const initialState = {
    arrTaskType: [],
    taskDetailsModal: {}


}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_TASK_TYPE_REDUCER: {
            return { ...state, arrTaskType: action.taskType }
        }



        default: return { ...state }
    }
}


export const TaskDetailsReducer = (state = initialState, action) => {
    switch (action.type) {

        case TASK_DETAILS_REDUCER: {
            return { ...state, taskDetailsModal: action.taskModel }
        }
        case CHANGE_TASK_MODAL: {
            const { name, value } = action
            return { ...state, taskDetailsModal: { ...state.taskDetailsModal, [name]: value } }
        }
        case CHANGE_ASSIGNEE_TASK_MODAL: {
            state.taskDetailsModal.assigness = [...state.taskDetailsModal.assigness, action.userSelect]
            return { ...state }
        }
        case REMOVE_USER_ASSIGN_TASK: {
            console.log(action)
            state.taskDetailsModal.assigness = [...state.taskDetailsModal.assigness.filter(user => user.id !== action.userId)]
            return { ...state }
        }


        default: return { ...state }
    }
}