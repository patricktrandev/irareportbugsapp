import React, { useState } from 'react'
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { openFormCreateTaskModalActionDispatchReducer } from './../../redux/actions/JiraBugsAction'
import { useDispatch } from 'react-redux';
import FormCreateTask from './FormProject/FormCreateTask';



const { Header, Content, Footer, Sider } = Layout;

export const Sidebar = () => {
    const [state, setState] = useState({ collapsed: false })
    const dispatch = useDispatch()
    const toggle = () => {
        setState({
            collapsed: !state.collapsed
        })
    }
    return (
        <div >
            {/* Sider Bar  */}
            <Sider collapsible collapsed={state.collapsed} onCollapse={value => setState(value)} style={{ height: '100%', backgroundColor: '#065fd4' }}>
                <div className="sideBar-icon text-center px-3" onClick={toggle}>
                    <i className="fab fa-jira text-light large my-4" style={{ fontSize: '2rem' }} />
                </div>
                <Menu mode="inline" style={{ backgroundColor: '#065fd4', color: '#fff' }}>
                    <Menu.Item key='1' icon={<SearchOutlined />} onClick={() => dispatch(openFormCreateTaskModalActionDispatchReducer(<FormCreateTask />))} >
                        CREATE TASK
                    </Menu.Item>
                    <Menu.Item key='2' icon={<PlusCircleOutlined />}>CREATE ISSUE</Menu.Item>
                </Menu>
            </Sider>
            {/* <div className="sideBar">
                <div className="sideBar-top">
                    <div className="sideBar-icon">
                        <i className="fab fa-jira text-light large mt-4" style={{ fontSize: '2rem' }} />
                    </div>
                    <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
                        <i className="fa fa-search mr-4" />
                        <span className="title">SEARCH ISSUES</span>
                    </div>
                    <div className="sideBar-icon">
                        <i className="fa fa-plus mr-4" />
                        <span className="title">CREATE ISSUES</span>
                    </div>
                </div>
                <div className="sideBar-bottom">
                    <div className="sideBar-icon">
                        <i className="fa fa-question-circle mr-4" />
                        <span className="title">ABOUT</span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
