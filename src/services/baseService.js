import Axios from 'axios'
import { DOMAIN, TOKEN } from '../utils/GlobalSettings/systemSetting'
export class baseService {
    put = (url, id, model) => {
        return Axios({
            url: `${DOMAIN}${url}${id}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    get = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    delete = (url, id) => {
        return Axios({
            url: `${DOMAIN}${url}${id}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}