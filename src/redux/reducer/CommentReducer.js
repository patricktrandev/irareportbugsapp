import { GET_ALL_COMMENT_REDUCER } from "../constant/CommentConstant"

const initialState = {
    listComments: []
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_COMMENT_REDUCER:

            return { ...state, listComments: action.comments }

        default: return { ...state }
    }
}
