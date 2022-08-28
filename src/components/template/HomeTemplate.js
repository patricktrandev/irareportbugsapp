import React from 'react'
import { Route } from 'react-router-dom'
import { Header } from '../layout/Header';

export const HomeTemplate = (props) => {
    const { Component, ...restParam } = props;
    return (
        <Route path={restParam.path} render={(propRoute) => {
            return <>
                <Header />
                <Component {...propRoute} />
            </>
        }} />
    )
}
