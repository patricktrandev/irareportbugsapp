import { OPEN_DRAWER, CLOSE_DRAWER, OPEN_FORM_EDIT_PROJECT, SUBMIT_FORM_EDIT_PROJECT, OPEN_FORM_CREATE_TASK, SUBMIT_FORM_CREATE_TASK } from '../constant/ModalConstant'
import React from 'react';
const stateDefault = {
    visible: false,
    title: '',
    ComponentContentDrawer: <p>Default content</p>,
    callBackSubmit: (propsValue) => { alert('click') }
}

export const ModalJiraReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case OPEN_DRAWER: {
            state.visible = true;
            return { ...state }
        }
        case CLOSE_DRAWER: {
            state.visible = false;
            return { ...state }
        }
        case OPEN_FORM_EDIT_PROJECT: {
            console.log(action)
            state.visible = true;
            state.ComponentContentDrawer = action.newComponent;
            state.title = action.titleProject
            return { ...state }
        }
        case SUBMIT_FORM_EDIT_PROJECT: {

            state.callBackSubmit = action.submitFunc
            return { ...state }
        }
        case OPEN_FORM_CREATE_TASK: {

            state.visible = true;
            state.ComponentContentDrawer = action.newComponent;
            state.title = action.titleProject
            return { ...state }
        }
        case SUBMIT_FORM_CREATE_TASK: {

            state.callBackSubmit = action.submitFunc
            console.log(state)
            return { ...state }
        }
        default: return { ...state }
    }
}