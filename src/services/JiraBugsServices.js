import Axios from 'axios'
import { DOMAIN, TOKEN } from '../utils/GlobalSettings/systemSetting'
import { baseService } from './baseService'
export const jiraBugsService = {
    //USER
    signInJira: (userLogin) => {
        return Axios({
            url: `${DOMAIN}/users/signin`,
            method: 'POST',
            data: userLogin
        })
    },
    getUser: (keyword) => {
        return Axios({
            url: `${DOMAIN}/Users/getUser?keyword=${keyword}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    assignUserToProject: (userProject) => {
        return Axios({
            url: `${DOMAIN}/Project/assignUserProject`,
            method: 'POST',
            data: userProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    deleteUserFromProject: (userProject) => {
        return Axios({
            url: `${DOMAIN}/Project/removeUserFromProject`,
            method: 'POST',
            data: userProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getUserByProject: (keyword) => {
        return Axios({
            url: `${DOMAIN}/Users/getUserByProjectId?idProject=${keyword}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },

    getAllUser: (keyword) => {
        let urlGet = '/Users/getUser';
        if (keyword) {
            urlGet = `${urlGet}?keyword=${keyword}`
        }
        return Axios({
            url: `${DOMAIN}${urlGet}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },


    //PROJECT
    getAllProjectCategory: () => {
        return Axios({
            url: `${DOMAIN}/ProjectCategory`,
            method: 'GET',
        })
    },
    getAllProjectAuthorize: () => {
        return Axios({
            url: `${DOMAIN}/Project/getAllProject`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    createProject: (newProject) => {
        return Axios({
            url: `${DOMAIN}/Project/createProject`,
            method: 'POST',
            data: newProject
        })
    },
    createProjectAuthorize: (newProject) => {
        return Axios({
            url: `${DOMAIN}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    updateProjectAuthorize: (updatedProject) => {

        return Axios({
            url: `${DOMAIN}/Project/updateProject?projectId=${updatedProject.id}`,
            method: 'PUT',
            data: updatedProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    deleteProjectAuthorize: (projectId) => {

        return Axios({
            url: `${DOMAIN}/Project/deleteProject?projectId=${projectId}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getProjectDetailsAuthorize: (id) => {
        return Axios({
            url: `${DOMAIN}/Project/getProjectDetail?id=${id}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },



    //TASK
    getAllTaskType: () => {
        return Axios({
            url: `${DOMAIN}/TaskType/getAll`,
            method: 'GET',
        })
    },
    createTaskAuthorize: (newTask) => {
        return Axios({
            url: `${DOMAIN}/Project/createTask`,
            method: 'POST',
            data: newTask,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getTaskDetailsAuthorize: (id) => {
        return Axios({
            url: `${DOMAIN}/Project/getTaskDetail?taskId=${id}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    updateTaskStatusAuthorize: (taskId, statusId) => {
        const updateStatusModel = {
            taskId,
            statusId,
        }
        return Axios({
            url: `${DOMAIN}/Project/updateStatus`,
            method: 'PUT',
            data: updateStatusModel,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    updateTaskModalAuthorize: (updatedTaskModal) => {

        return Axios({
            url: `${DOMAIN}/Project/updateTask`,
            method: 'POST',
            data: updatedTaskModal,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    deleteTaskModalAuthorize: (taskId) => {

        return Axios({
            url: `${DOMAIN}/Project/removeTask?taskId=${taskId}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },


    //Priority
    getTaskPriority: (id) => {
        return Axios({
            url: `${DOMAIN}/Priority/getAll?id=${id}`,
            method: 'GET',
        })
    },


    //STATUS
    getAllStatus: () => {
        return Axios({
            url: `${DOMAIN}/Status/getAll`,
            method: 'GET',
        })
    },


    //COMMENT
    getAllComments: (id) => {
        return Axios({
            url: `${DOMAIN}/Comment/getAll?taskId=${id}`,
            method: 'GET',
        })
    },
    addNewCommentAuthorize: (newComment) => {
        return Axios({
            url: `${DOMAIN}/Comment/insertComment`,
            data: newComment,
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    editCommentAuthorize: (id, content) => {
        return Axios({
            url: `${DOMAIN}/Comment/updateComment?id=${id}&contentComment=${content}`,
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    deleteCommentAuthorize: (id) => {
        return Axios({
            url: `${DOMAIN}/Comment/deleteComment?idComment=${id}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
}

