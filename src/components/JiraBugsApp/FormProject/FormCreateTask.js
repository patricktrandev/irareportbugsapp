import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react'
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Select, Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProjectDropDownActionDispatchSaga,
    getAlltaskTypeActionSaga,
    getAllTaskPriorityActionSaga,
    userSearchActionToSaga,
    getAllStatusActionSaga,
    getUserByProjectActionToSaga
} from '../../../redux/actions/JiraBugsAction'
import { CREATE_NEW_TASK } from '../../../redux/constant/TaskConstant';
import { SUBMIT_FORM_CREATE_TASK } from '../../../redux/constant/ModalConstant';


const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const FormCreateTask = (props) => {
    const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;
    const [size, setSize] = useState('default')
    const [timeTracking, setTimeTracking] = useState({
        timeSpent: 0,
        timeRemaining: 0
    });

    const dispatch = useDispatch();
    const { projectsDropdown } = useSelector(state => state.ProjectReducer)
    const { arrTaskType } = useSelector(state => state.TaskReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { userByProject, userSearch } = useSelector(state => state.UserReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)

    const userSearchOption = userByProject?.map((item, index) => {
        return { value: item.userId, label: item.name }
    })




    useEffect(() => {
        dispatch(getAllProjectDropDownActionDispatchSaga())
        dispatch(getAlltaskTypeActionSaga())
        dispatch(getAllTaskPriorityActionSaga())
        dispatch(userSearchActionToSaga(''))
        dispatch(getAllStatusActionSaga())
        dispatch({
            type: SUBMIT_FORM_CREATE_TASK,
            submitFunc: handleSubmit
        })
    }, [])


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="form-group">
                <div className='row'>
                    <div className='col-6'>
                        <p>Task Name</p>
                        <input type="text" name="taskName" className="form-control" height="30" onChange={handleChange} />
                    </div>
                    <div className='col-6'>
                        <p>Status</p>
                        <select name='statusId' className='form-control' onChange={handleChange}>
                            {arrStatus?.map((item, index) => {
                                return <option key={item.statusId} value={Number(item.statusId)}>{item.statusName}</option>
                            })}
                        </select>
                    </div>
                </div>

            </div>
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className="form-control" onChange={(e) => {
                    setFieldValue('projectId', e.target.value)
                    dispatch(getUserByProjectActionToSaga(e.target.value))
                }}>
                    {
                        projectsDropdown?.map((project, index) => {
                            return <option key={project.id} value={Number(project.id)}>{project.projectName}</option>
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control" onChange={handleChange}>

                            {arrPriority?.map((item, index) => {
                                return <option key={item.priorityId} value={Number(item.priorityId)}>{item.priority}</option>
                            })}

                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId" onChange={handleChange}>
                            {
                                arrTaskType?.map((taskType, index) => {
                                    return <option key={taskType.id} value={Number(taskType.id)}>{taskType.taskType}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Assignees</p>
                        <Select

                            mode="multiple"
                            size={size}
                            options={userSearchOption}
                            placeholder="Please select"
                            optionFilterProp='label'

                            onChange={(values) => {
                                setFieldValue('listUserAsign', values)
                            }}
                            onSelect={(value) => { }}
                            style={{ width: '100%' }}
                        >
                            {children}
                        </Select>
                        <div className="row" style={{ marginTop: '1.3em' }} >
                            <div className="col-12">
                                <p>Original Estimate</p>
                                <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange={handleChange} />
                            </div>
                        </div>

                    </div>
                    <div className="col-6">
                        <p>Time tracking</p>
                        <Slider
                            style={{ height: '16px' }}
                            defaultValue={30} value={Number(timeTracking.timeSpent)} max={Number(timeTracking.timeSpent) + Number(timeTracking.timeRemaining)} />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeSpent} hours logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeRemaining} hours remaining</div>
                        </div>
                        <div className="row" style={{ marginTop: 5 }}>
                            <div className="col-6">
                                <p className='small'>Time spent (hours)</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking, timeSpent: e.target.value
                                    })
                                    setFieldValue('timeTrackingSpent', Number(e.target.value))
                                }}

                                />
                            </div>

                            <div className="col-6">
                                <p className='small'>Time remaining (hours)</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimeTracking({ ...timeTracking, timeRemaining: e.target.value })
                                    setFieldValue('timeTrackingRemaining', Number(e.target.value))
                                }} />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name='description'


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
                    onEditorChange={handleEditorChange}
                />
            </div>

        </form>
    )
}

const createTaskFormWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {


        return {
            taskName: '',
            description: '',
            statusId: Number(props.arrStatus[0]?.statusId),
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: Number(props.projectsDropdown[0]?.id),
            typeId: Number(props.arrTaskType[0]?.id),
            priorityId: Number(props.arrPriority[0]?.priorityId),
            listUserAsign: []
        }
    },
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log("243", values)
        console.log("244", props);
        props.dispatch({
            type: CREATE_NEW_TASK,
            newTask: values
        })
    },


    displayName: 'createTaskFormik',
})(FormCreateTask);
const mapStateToProps = (state) => {

    return {
        projectsDropdown: state.ProjectReducer.projectsDropdown,
        arrTaskType: state.TaskReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus
    }
}

export default connect(mapStateToProps)(createTaskFormWithFormik);