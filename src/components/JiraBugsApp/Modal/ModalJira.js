import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Select, Input, List, Avatar, Skeleton, Popconfirm } from 'antd';
import VirtualList from 'rc-virtual-list';
import parse from 'html-react-parser';
import { CHANGE_ASSIGNEE_TASK_MODAL, CHANGE_TASK_MODAL, HANDLE_CHANGE_TASK_MODAL, TASK_DETAILS_REDUCER } from '../../../redux/constant/TaskConstant';
import { getAllCommentsActionSaga } from '../../../redux/actions/JiraBugsAction'
import {
    getAllStatusActionSaga,
    getAllTaskPriorityActionSaga,
    getAlltaskTypeActionSaga,
    updatetaskStatusActionSaga,
    removeUserActionReducer,
    addNewCommentActionSaga,
    editCommentActionSaga,
    deleteCommentActionSaga,
    deleteTaskActionSaga
} from '../../../redux/actions/JiraBugsAction'
import { REMOVE_USER_ASSIGN_TASK } from '../../../redux/constant/UserConstant';
import { DELETE_COMMENT } from '../../../redux/constant/CommentConstant';



const { Option } = Select;

export const ModalJira = () => {
    const { taskDetailsModal } = useSelector(state => state.TaskDetailsReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { arrTaskType } = useSelector(state => state.TaskReducer)
    const { projectDetails } = useSelector(state => state.SingleProjectReducer);
    const { listComments } = useSelector(state => state.CommentReducer)
    const [visibleEditor, setVisibleEditor] = useState(false);
    const [showAddMore, setShowAddMore] = useState(false);
    const [historyContent, setHistoryContent] = useState(taskDetailsModal.description);
    const [content, setContent] = useState(taskDetailsModal.description)
    const [comment, setComment] = useState('')
    const [newComment, setNewComment] = useState(false)
    const [edit, setEdit] = useState(false);
    const [editComment, setEditComment] = useState('');
    // console.log(taskDetailsModal)
    // console.log("35", listComments)
    // console.log("36", taskDetailsModal.lstComment)
    // console.log(editComment)
    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getAllTaskPriorityActionSaga())
        dispatch(getAllStatusActionSaga())
        dispatch(getAlltaskTypeActionSaga())

        //dispatch(getAllCommentsActionSaga(task.taskId))
    }, [])

    const renderDescription = () => {
        const jsxText = parse(String(taskDetailsModal.description))
        return <div >
            {
                visibleEditor ?
                    (
                        <>
                            <Editor
                                name='description'

                                initialValue={taskDetailsModal.description}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onEditorChange={(content, editor) => { setContent(content) }}
                            />
                            <div className='my-3'>
                                <Button style={{ marginRight: '12px' }} size='medium' shape='round' type='primary'
                                    onClick={() => {

                                        // dispatch({
                                        //     type: CHANGE_TASK_MODAL,
                                        //     name: 'description', value: content
                                        // })
                                        dispatch({
                                            type: HANDLE_CHANGE_TASK_MODAL,
                                            actionType: CHANGE_TASK_MODAL,
                                            name: 'description', value: content
                                        })
                                        setVisibleEditor(false)
                                    }}
                                >Save</Button>
                                <Button size='medium' type='danger' shape='round'
                                    onClick={() => {
                                        // dispatch({
                                        //     type: CHANGE_TASK_MODAL,
                                        //     name: 'description', value: historyContent
                                        // })
                                        dispatch({
                                            type: HANDLE_CHANGE_TASK_MODAL,
                                            actionType: CHANGE_TASK_MODAL,
                                            name: 'description', value: historyContent
                                        })
                                        setVisibleEditor(false)
                                    }}
                                >Close</Button>
                            </div>
                        </>


                    )
                    : (<div onClick={() => {
                        setHistoryContent(taskDetailsModal.description)
                        setVisibleEditor(!visibleEditor)
                    }}>
                        {jsxText}
                    </div>)
            }
        </div>
    }


    const handleChange = (e) => {
        // dispatch(updatetaskStatusActionSaga(taskDetailsModal.taskId, e.target.value, taskDetailsModal.projectId))
        let { name, value } = e.target;
        // dispatch({
        //     type: CHANGE_TASK_MODAL,
        //     name, value
        // })

        dispatch({
            type: HANDLE_CHANGE_TASK_MODAL,
            actionType: CHANGE_TASK_MODAL,
            name, value
        })
    }
    const onSelect = (value) => {
        //console.log(`selected ${value}`);
        const valueSelect = value;

        let userSelect = projectDetails.members?.find(mem => mem.userId === valueSelect);
        console.log("117 ", userSelect)
        userSelect = { ...userSelect, id: userSelect.userId };
        console.log("119 ", userSelect)
        // dispatch({
        //     type: CHANGE_ASSIGNEE_TASK_MODAL,
        //     userSelect
        // })

        dispatch({
            type: HANDLE_CHANGE_TASK_MODAL,
            actionType: CHANGE_ASSIGNEE_TASK_MODAL,
            userSelect
        })
    };

    const renderTaskComments = () => {
        return listComments?.filter((item, index) => {
            if (index < (listComments?.length - 1)) {
                return false
            }
            return true
        }).map((item, index) => {
            return <div key={item.id} className="comment-item">
                <div className="display-comment" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={item.user.avatar} alt={item.user.name} />
                    </div>
                    <div>
                        <p className='text-success' style={{ marginBottom: 5 }}>
                            {item.user.name}
                        </p>

                        <div>
                            {
                                edit ? (
                                    <div className='my-2'>
                                        <Input
                                            defaultValue={item.contentComment}
                                            value={editComment}
                                            onChange={(e) => { setEditComment(e.target.value) }}
                                            placeholder="Basic usage"
                                            style={{ margin: '10px 0' }}
                                        />

                                        <Button style={{ marginRight: '12px' }} size='medium' shape='round' type='primary' onClick={() => {
                                            dispatch(editCommentActionSaga(taskDetailsModal.taskId, editComment, item.id))
                                            setEdit(false)
                                            setEditComment('')
                                        }}>Save</Button>
                                        <Button size='medium' shape='round' type='danger' onClick={() => { setEdit(false) }}>Close</Button>
                                    </div>
                                ) : (
                                    <>
                                        <p style={{ marginBottom: 5 }}>
                                            {item.contentComment}
                                        </p>
                                        <span className='mx-3 comment-option' onClick={() => {
                                            setEdit(!edit)
                                            setEditComment(item.contentComment)
                                        }} >Edit</span>
                                    </>

                                )
                            }

                            •
                            <span type='button' className='mx-3 comment-option' onClick={() => { dispatch(deleteCommentActionSaga(item.id, taskDetailsModal.taskId)) }}>Delete</span>

                        </div>
                    </div>
                </div>
            </div >

        })
    }
    const renderTimeTracking = () => {
        const maxNum = Number(taskDetailsModal.timeTrackingSpent) + Number(taskDetailsModal.timeTrackingRemaining);
        const portionDisplaying = Math.round((Number(taskDetailsModal.timeTrackingSpent) / maxNum) * 100);

        return <div>
            <div className="time-tracking">
                <h6>TIME TRACKING</h6>
                <div style={{ display: 'flex' }}>
                    <i className="fa fa-clock" />
                    <div style={{ width: '100%' }}>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: `${portionDisplaying}%` }} aria-valuenow={portionDisplaying} aria-valuemin={0} aria-valuemax={maxNum} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="logged">{Number(taskDetailsModal.timeTrackingSpent)} hours logged</p>
                            <p className="estimate-time">{Number(taskDetailsModal.timeTrackingRemaining)} hours remaining</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <input name='timeTrackingSpent' className='form-control' onChange={(e) => handleChange(e)} />
                    </div>
                    <div className='col-6'>
                        <input name='timeTrackingRemaining' className='form-control' onChange={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>

        </div>

    }
    return (
        <>
            {/* Search Modal */}
            <div className="modal fade" id="searchModal" tabIndex={-1} role="dialog" aria-labelledby="searchModal" aria-hidden="true">
                <div className="modal-dialog modal-search">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="search-block">
                                <input className="search" />
                                <i className="fa fa-search" />
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>RECENT ISSUES</p>
                            <div style={{ display: 'flex' }}>
                                <div className="icon">
                                    <i className="fa fa-bookmark" />
                                </div>
                                <div>
                                    <p>cyberlearn</p>
                                    <p>BUG-238066</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Info Modal */}
            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title d-flex">
                                <i className="fa fa-bookmark mr-4" style={{ fontSize: '1.3rem' }} />
                                <select name='typeId' value={taskDetailsModal.typeId} className="custom-select" onChange={(e) => handleChange(e)}>
                                    {arrTaskType.map((typeTask, index) => {
                                        return <option key={typeTask.id} value={typeTask.id} >{typeTask.taskType}</option>

                                    })}
                                </select>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt del-task" onClick={() => { dispatch(deleteTaskActionSaga(taskDetailsModal.projectId, taskDetailsModal.taskId)) }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue">This is an issue of type: Task.</p>
                                        <div className="description">
                                            <h5 className='font-weight-bold my-1 text-primary'>Description</h5>
                                            {renderDescription()}
                                        </div>
                                        <div style={{ fontWeight: 500, marginBottom: 10 }}>
                                            Jira Software (software projects) issue types:
                                        </div>
                                        <div className="title">
                                            <div className="title-item">
                                                <h3>BUG <i className="fa fa-bug text-primary" /></h3>
                                                <p>
                                                    A bug is a problem which impairs or prevents the
                                                    function of a product.
                                                </p>
                                            </div>
                                            <div className="title-item">
                                                <h3>STORY <i className="fa fa-book-reader text-danger" /></h3>
                                                <p>
                                                    A user story is the smallest unit of work that needs to
                                                    be done.
                                                </p>
                                            </div>
                                            <div className="title-item">
                                                <h3>TASK <i className="fa fa-tasks text-success" /></h3>
                                                <p>A task represents work that needs to be done</p>
                                            </div>
                                        </div>
                                        <div className="comment">
                                            <h6>Comment</h6>
                                            <div className="block-comment" style={{ display: 'flex' }}>
                                                <div className="avatar">
                                                    <img src="./img/ava2.png" alt='ava2' />
                                                </div>

                                                <div className="input-comment" onClick={() => {
                                                    setNewComment(!newComment)
                                                }}>
                                                    <input value={comment} name='commentContent' onChange={(e) => { setComment(e.target.value) }} className={newComment ? 'bg-input-comment-white' : 'bg-input-comment'} type="text" placeholder="Add a comment ..." />

                                                    {
                                                        newComment ? <div className='my-2'>
                                                            <Button style={{ marginRight: '12px' }} size='medium' shape='round' type='primary' onClick={() => {
                                                                dispatch(addNewCommentActionSaga(taskDetailsModal.taskId, comment))
                                                                setNewComment(false)
                                                                setComment('')
                                                            }}>Save</Button>
                                                            <Button size='medium' shape='round' type='danger' onClick={() => { setNewComment(false) }}>Close</Button>

                                                        </div> : <></>
                                                    }

                                                    <p>
                                                        <span style={{ fontWeight: 500, color: 'gray' }}>Protip: </span>
                                                        <span>Click
                                                            <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}> text editor </span>
                                                            to comment</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="lastest-comment">

                                                {renderTaskComments()}


                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select name='statusId' value={taskDetailsModal.statusId} className="custom-select" onChange={(e) => handleChange(e)}>
                                                {arrStatus.map((status, index) => {
                                                    return <option key={status.statusId} value={status.statusId} >{status.statusName}</option>

                                                })}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div className='row' style={{ marginBottom: '10px' }}>
                                                {
                                                    taskDetailsModal.assigness?.map((assignee, index) => {
                                                        return <div key={`assignee${index}`} style={{ display: 'flex', backgroundColor: '#1F51FF' }} className="item my-1 text-white col-5">
                                                            <div className="avatar">
                                                                <img src={assignee?.avatar} alt='ava3' />
                                                            </div>
                                                            <p className="name">
                                                                {assignee?.name}
                                                                <i className="fa fa-times text-warning" style={{ marginLeft: 5, cursor: 'pointer' }}
                                                                    onClick={() => {
                                                                        // dispatch(removeUserActionReducer(assignee.id))
                                                                        dispatch({
                                                                            type: HANDLE_CHANGE_TASK_MODAL,
                                                                            actionType: REMOVE_USER_ASSIGN_TASK,
                                                                            userId: assignee.id
                                                                        })
                                                                    }}
                                                                />
                                                            </p>
                                                        </div>
                                                    })
                                                }

                                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} className='add-more' onClick={() => { setShowAddMore(!showAddMore) }} >
                                                    <i className={showAddMore ? "fa fa-minus" : "fa fa-plus"} style={{ marginRight: 5 }} /><span>{showAddMore ? 'Hide Select' : 'Add more'}</span>

                                                </div>
                                                {
                                                    showAddMore && (<Select
                                                        showSearch
                                                        style={{
                                                            width: 'auto',
                                                            margin: '15px'
                                                        }}
                                                        placeholder="Select a person"
                                                        optionFilterProp="children"
                                                        onSelect={onSelect}
                                                        onSearch={() => { }}
                                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                                    >
                                                        {
                                                            projectDetails.members?.filter(mem => {
                                                                let index = taskDetailsModal.assigness?.findIndex(user => user?.id === mem?.userId)
                                                                if (index !== -1) {
                                                                    return false;
                                                                }
                                                                return true
                                                            }).map((mem, index) => {
                                                                return <Option value={mem?.userId}>{mem?.name}</Option>
                                                            })
                                                        }

                                                    </Select>
                                                    )
                                                }


                                            </div>
                                        </div>
                                        {/* <div className="reporter">
                                            <h6>REPORTER</h6>
                                            <div style={{ display: 'flex' }} className="item">
                                                <div className="avatar">
                                                    <img src="./img/ava3.png" alt='ava3' />
                                                </div>
                                                <p className="name">
                                                    Pickle Rick
                                                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                                </p>
                                            </div>
                                        </div> */}
                                        <div className="priority" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select name='priorityId' value={taskDetailsModal.priorityId} onChange={(e) => handleChange(e)}>
                                                {arrPriority.map((option, index) => {
                                                    return <option key={`prior${index}`} value={option.priorityId}>{option.priority}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input name='originalEstimate' onChange={(e) => handleChange(e)} type="text" value={taskDetailsModal.originalEstimate} className="estimate-hours" />
                                        </div>
                                        {renderTimeTracking()}
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
