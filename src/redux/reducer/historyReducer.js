import { useHistory } from "react-router-dom";

const historyState = {
    history: {}
}

export const historyReducer = (state = historyState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY': {
            state.history = action.history
            return { ...state }
        }
        default: return { ...state }

    }
}