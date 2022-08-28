import React from 'react'
import { useSelector } from 'react-redux';
import styleLoading from './LoadingComponent.module.css'
export const LoadingComponent = () => {
    const { loading } = useSelector(state => state.loadingReducer);
    if (loading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src={require('../../assets/imgLoading/curves.gif')} alt='gif-loading' />
            </div>
        )
    } else {
        return ''
    }
}
