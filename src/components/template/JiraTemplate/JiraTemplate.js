
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import '../../../App.css'
import { IndexJiraApp } from '../../JiraBugsApp/IndexJiraApp';
import { Menu } from '../../JiraBugsApp/Menu';
import { ModalJira } from '../../JiraBugsApp/Modal/ModalJira';
import { Sidebar } from '../../JiraBugsApp/Sidebar';
export const JiraTemplate = (props) => {
    const { Component, ...restParam } = props;
    const { userLogin } = useSelector(state => state.UserReducer)

    return (
        <Route {...restParam} render={(propsRoute) => {
            return <>
                <div className='jira' style={{ height: '100%' }}>
                    <Sidebar />
                    <Menu userSession={userLogin} />
                    <Component {...propsRoute} />

                </div>
                <ModalJira />

            </>
        }} />
    )
}
