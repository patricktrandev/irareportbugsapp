import { USER_LOGIN } from '../../utils/GlobalSettings/systemSetting'
import { USER_LOGIN_INFO, GET_USER_SEARCH_REDUCER, GET_USER_BY_PROJECT_REDUCER, GET_ALL_USERS, GET_ALL_USERS_REDUCER } from '../constant/UserConstant'
let userLoginInStorage = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)) : {}
const stateDefault = {
    userLogin: userLoginInStorage,
    userSearch: [],
    userByProject: [],
    userList: []
}

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case USER_LOGIN_INFO: {
            state.userLogin = action.userLogin
            return { ...state }
        }
        case GET_USER_SEARCH_REDUCER: {

            state.userSearch = action.listUserSearch

            return { ...state }
        }
        case GET_USER_BY_PROJECT_REDUCER: {
            state.userByProject = action.listUserByProject;
            return { ...state }
        }
        case GET_ALL_USERS_REDUCER: {

            return { ...state, userList: action.users }
        }
        default: return { ...state }
    }
}