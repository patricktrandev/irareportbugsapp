import React from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar, Image, Tag } from 'antd';
export const Menu = (props) => {
    return (
        <>
            {/* Menu */}
            <div className="menu" style={{ minHeight: '107vh' }} >
                <div className="account">
                    <div className="avatar">
                        <img src="/img/logo.png" alt='logo.png' />
                    </div>
                    <div className="account-info">
                        <p>Jira Clone</p>
                        <p>Report bugs</p>
                    </div>

                </div>
                {
                    props.userSession && <div className='text-center' >

                        <div className="account-info mb-5">

                            <h5> Welcome</h5>
                            <Avatar src={<Image src={props.userSession.avatar} style={{ width: 32 }} />} />
                            <span className='mx-2'></span>
                            <Tag color="#108ee9">#{props.userSession.name}</Tag>
                        </div>

                    </div>
                }

                <div className="control">
                    {/* <div className='option' >
                        <i className="fa fa-credit-card mr-2" />
                        <NavLink to='/dashboard' style={{ textDecoration: 'none' }} activeClassName='active font-weight-bold'>Board</NavLink>
                    </div> */}
                    <div className='option'>
                        <i className="fa fa-expand-arrows-alt mr-2"></i>
                        <NavLink to='/projects' activeClassName='active font-weight-bold'>Project Management</NavLink>
                    </div>
                    <div className='option'>
                        <i className="fa fa-cog mr-2" />
                        <NavLink exact to='/newproject' activeClassName='active font-weight-bold'>New Project</NavLink>
                    </div>
                    <div className='option'>
                        <i className="fa fa-cog mr-2" />
                        <NavLink exact to='/users' activeClassName='active font-weight-bold'>User Management</NavLink>
                    </div>
                </div>
                <div className="feature">
                    <div className='option'>
                        <i className="fa fa-truck mr-2" />
                        <span> Releases</span>
                    </div>
                    <div className='option'>
                        <i className="fa fa-equals mr-2" />
                        <span> Issues and filters</span>
                    </div>
                    <div className='option'>
                        <i className="fa fa-paste mr-2" />
                        <span> Pages</span>
                    </div>
                    <div className='option'>
                        <i className="fa fa-location-arrow mr-2" />
                        <span> Reports</span>
                    </div>
                    <div className='option'>
                        <i className="fa fa-box mr-2" />
                        <span> Components</span>
                    </div>
                </div>
            </div>
        </>
    )
}
