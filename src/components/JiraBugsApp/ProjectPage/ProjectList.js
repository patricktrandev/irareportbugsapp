import React, { useEffect, useRef, useState } from 'react'
import parse from 'html-react-parser';
import { DeleteOutlined, FormOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { HeaderProject } from './HeaderProject';
import { Button, message, Popconfirm, Tag, Table, Space, Avatar, Popover, AutoComplete } from 'antd';
import {
    openFormModalActionDispatchReducer,
    loadingDataIntoFormModalActionDispatchReducer,
    getAllProjectActionDispatchSaga,
    userSearchActionToSaga,
    assignUserActionToSaga,
    deleteUserInProjectActionToSaga,
    getProjectDetailsActionToSaga
} from '../../../redux/actions/JiraBugsAction'
import FormEditProject from '../FormProject/FormEditProject';
import { NavLink } from 'react-router-dom';



const cancel = (e) => {
    message.error('cancel')
}

export const ProjectList = (props) => {
    const [value, setValue] = useState();
    const { projects } = useSelector(state => state.ProjectReducer);
    const { userSearch } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();
    const searchRef = useRef(null);
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null
    });
    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter
        })
    }
    const clearFilters = () => {
        setState({ filteredInfo: null })
    }
    const clearAll = () => {
        setState({ filteredInfo: null, sortedInfo: null })
    };
    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            }

        });
    };
    useEffect(() => {
        dispatch(getAllProjectActionDispatchSaga())
    }, [])

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (i2, i1) => { return i2.id - i1.id }

        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            filteredValue: filteredInfo.projectName || null,
            onFilter: (value, record) => record.projectName.includes(value),
            sorter: (a, b) => a.projectName.length - b.projectName.length,
            sortOrder: sortedInfo.columnKey === 'projectName' ? sortedInfo.order : null,
            ellipsis: true,

        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',

        },
        {
            title: 'Created By',
            dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color='cyan'>{record.creator.name}</Tag>
            }

        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {
                        record.members?.slice(0, 3).map((user, index) => {
                            return <Popover key={index}
                                placement='top'
                                content={() => {
                                    return <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Avatar</th>
                                                <th>#</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                record.members.map((item, index) => {
                                                    return <tr key={`member${index}`}>
                                                        <td>{item.userId}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <Avatar key={`m${item.name}`} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={30}>{String(item.name).substr(0, 2)}</Avatar>
                                                        </td>
                                                        <td>
                                                            <Popconfirm
                                                                title="Are you sure to delete this record?"
                                                                onConfirm={() => {
                                                                    dispatch(deleteUserInProjectActionToSaga(item.userId, record.id))
                                                                }}
                                                                okText="Yes"
                                                                cancelText="No"
                                                            >

                                                                <Button type='danger' size='small' icon={<DeleteOutlined />}></Button>
                                                            </Popconfirm>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                }}
                                style={{ width: '100%' }}
                                title="Members"
                                trigger="click"
                            >

                                <Avatar key={`mem${user.name}`} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={30}>{String(user.name).substr(0, 2)}</Avatar>
                            </Popover>


                        })
                    }
                    {record.members?.length > 2 ? <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>...</Avatar> : ''}
                    <Popover
                        placement='topLeft'
                        content={<AutoComplete
                            options={userSearch?.map((ele, index) => {
                                return { label: ele.name, value: ele.userId.toString() }
                            })}
                            value={value}
                            onChange={(text) => { setValue(text) }}
                            style={{ width: 150 }}
                            onSearch={(value) => {
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current)
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch(userSearchActionToSaga(value))
                                }, 300)

                            }}
                            onSelect={(valueSelect, option) => {
                                setValue(option.label)
                                dispatch(assignUserActionToSaga(valueSelect, record.id))
                            }}
                        />}
                        title="Add member"
                        trigger="click"

                    > <Button style={{ color: 'tomato' }} type="default" shape="circle" icon={<PlusOutlined />} size={5}></Button>

                    </Popover>
                </div>

            }

        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                    <NavLink to={`/project/${record.id}`}>
                        <Button type='secondary' shape='circle' size='small' icon={<EyeOutlined />}

                        ></Button>
                    </NavLink>

                    <button className="btn mx-2 btn-primary" onClick={() => {

                        dispatch(openFormModalActionDispatchReducer(<FormEditProject />))
                        dispatch(loadingDataIntoFormModalActionDispatchReducer(record))
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this record?"
                        onConfirm={() => {
                            dispatch({
                                type: 'DELETE_PROJECT',
                                projectId: record.id
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger" >
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>,


                </div>
            },
        }

    ];
    return (
        <div className='container'>
            <HeaderProject title={'Projects'} />
            <h5 className='ml-2'>List of Project</h5>

            <Table columns={columns} dataSource={projects} rowKey={'id'} onChange={handleChange} />
        </div>
    )
}
