import React from 'react'
import { useSelector } from 'react-redux'

export const Home = () => {
    const { userLogin } = useSelector(state => state.UserReducer)
    console.log('home line 6', userLogin)
    return (
        <div>
            <h3>Hello {userLogin.name}</h3>
        </div>
    )
}
