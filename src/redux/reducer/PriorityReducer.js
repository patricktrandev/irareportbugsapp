import { GET_ALL_PRIORITY_REDUCER } from "../constant/PriorityConstant"
import { GET_ALL_TASK_TYPE_REDUCER } from "../constant/TaskConstant"

const initialState = {
    arrPriority: []
}

export const PriorityReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PRIORITY_REDUCER: {
            return { ...state, arrPriority: action.data }
        }


        default: return { ...state }
    }
}
