import { DISPLAY_LOADING, HIDE_LOADING } from "../constant/LoadingConstant"
const initialState = {
    loading: false
}

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_LOADING: {
            state.loading = true
            return { ...state }
        }
        case HIDE_LOADING: {
            state.loading = false
            return {
                ...state,

            }
        }

        default:
            return { ...state }
    }
}