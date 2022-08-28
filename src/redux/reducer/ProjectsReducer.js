import {
    GET_ALL_PROJECT_DROPDOWN_REDUCER,
    GET_ALL_PROJECT_REDUCER,


} from "../constant/ProjectConstant"

const stateDefault = {
    projects: [],
    projectsDropdown: []
}

export const ProjectReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_REDUCER: {
            state.projects = action.data;
            return { ...state }
        }
        case GET_ALL_PROJECT_DROPDOWN_REDUCER: {
            state.projectsDropdown = action.data

            return { ...state }
        }

        default: return { ...state }
    }
}