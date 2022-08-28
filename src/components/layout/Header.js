import React from 'react'
import { Link } from 'react-router-dom'
export const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/todolist">Chapter 04</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/todolist">TodoList</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/todolistrcc">Todo List RCC</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/todolistsaga">Todo List Saga</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/demohoc">Demo HOC</Link>
                    </li>
                </ul>
            </div>
        </nav>

    )

}
