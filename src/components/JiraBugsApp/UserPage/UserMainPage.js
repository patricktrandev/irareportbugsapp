import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserWithKeywordActionToSaga } from '../../../redux/actions/JiraBugsAction'
import { HeaderProject } from '../ProjectPage/HeaderProject'
export const UserMainPage = () => {
    const dispatch = useDispatch()

    const { userList } = useSelector(state => state.UserReducer)
    const [keySearch, setKeySearch] = useState('');

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null
    });
    console.log("10", userList)
    useEffect(() => {
        dispatch(getAllUserWithKeywordActionToSaga(keySearch))
    }, [])
    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter
        })
    }
    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'id',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (i2, i1) => { return i2.userId - i1.userId }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: filteredInfo.name || null,
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filteredValue: filteredInfo.email || null,
            sorter: (a, b) => a.email.length - b.email.length,
            sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
            ellipsis: true,
        },


    ];
    return (
        <div className='container'>
            <HeaderProject title={'Projects'} />
            <h5 className='ml-2'>List of User</h5>

            <Table columns={columns} dataSource={userList} rowKey={'id'} onChange={handleChange} />
        </div>
    )
}
