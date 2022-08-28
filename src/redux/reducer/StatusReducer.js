import { GET_ALL_STATUS_REDUCER } from "../constant/StatusConstant"

const initialState = {
    arrStatus: []
}

export const StatusReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_STATUS_REDUCER: {
            return { ...state, arrStatus: action.data }
        }


        default: return { ...state }
    }
}
