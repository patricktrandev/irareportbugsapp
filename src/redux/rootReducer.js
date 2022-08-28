import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddlewareSaga from 'redux-saga'
import { rootSaga } from "./saga/rootSaga";
import { loadingReducer } from '../redux/reducer/LoadingReducer'
import { historyReducer } from '../redux/reducer/historyReducer'
import { UserReducer } from './reducer/UserReducer'
import { ProjectCategoryReducer } from './reducer/ProjectCategoryReducer'
import { ProjectReducer } from './reducer/ProjectsReducer'
import { ModalJiraReducer } from './reducer/ModalJiraReducer'
import { SingleProjectReducer } from './reducer/SingleProjectReducer'
import { TaskReducer, TaskDetailsReducer } from './reducer/TaskReducer'
import { PriorityReducer } from './reducer/PriorityReducer'
import { StatusReducer } from './reducer/StatusReducer'
import { CommentReducer } from './reducer/CommentReducer'
const middlewareSaga = createMiddlewareSaga();
const rootReducer = combineReducers({
    loadingReducer,
    historyReducer,
    UserReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    ModalJiraReducer,
    SingleProjectReducer,
    TaskReducer,
    PriorityReducer,
    StatusReducer,
    TaskDetailsReducer,
    CommentReducer
})

const store = createStore(rootReducer, applyMiddleware(middlewareSaga))
middlewareSaga.run(rootSaga)

export default store;