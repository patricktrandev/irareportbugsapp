import {
    EDIT_PROJECT_REDUCER,
    GET_PROJECT_DETAILS_REDUCER,
} from "../constant/ProjectConstant"

const stateDefault = {
    projectEdit: {},
    projectDetails: {}
}

export const SingleProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case EDIT_PROJECT_REDUCER: {
            state.projectEdit = action.record
            return { ...state }
        }
        case GET_PROJECT_DETAILS_REDUCER: {

            state.projectDetails = action.projectDetails

            return { ...state }
        }
        default: return { ...state }
    }
}