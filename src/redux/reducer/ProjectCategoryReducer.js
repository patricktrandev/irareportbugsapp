import { GET_PROJECT_CATEGORY_REDUCER } from '../constant/ProjectConstant'

const stateDefault = {
    arrProjectCategory: []
}

export const ProjectCategoryReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case GET_PROJECT_CATEGORY_REDUCER: {
            state.arrProjectCategory = action.content
            return { ...state }
        }
        default:
            return { ...state }
    }


}