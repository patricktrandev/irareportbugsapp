import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { HeaderProject } from './HeaderProject';
import { useDispatch, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import { GET_PROJECT_CATEGORY } from '../../../redux/constant/ProjectConstant'
import { getProjectCategoryActionDispatch, createProjectActionDispatchSaga } from '../../../redux/actions/JiraBugsAction'
import { connect } from 'react-redux';
import * as Yup from 'yup';
const ProjectCreation = (props) => {
    const dispatch = useDispatch()
    const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer)

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;
    useEffect(() => {
        dispatch(getProjectCategoryActionDispatch())
    }, [])
    const handleEditorChange = (content, editor) => {
        props.setFieldValue('description', content)
    }

    return (
        <div className='container m-5'>
            <HeaderProject title={'New Project'} />
            <h3 className='ml-4'>New Project</h3>
            <form className='container p-2' onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
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
                <div className='form-group'>
                    <select name='categoryId' className='form-control' onChange={handleChange} >

                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={`category${item.id}`}>{item.projectCategoryName}</option>
                        })}
                    </select>

                </div>
                <button type='submit' className='mt-5 btn btn-outline-primary rounded-pill px-5'>CREATE PROJECT</button>


            </form>
        </div>
    )
}

const createProjectFormWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        //console.log('79', props)
        // props.arrProjectCategory[0]?.id
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }
    },
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(createProjectActionDispatchSaga(values))
        //console.log(props)
    },


    displayName: 'createProjectFormik',
})(ProjectCreation);

const mapStateToProps = (state) => ({

    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory


})

export default connect(mapStateToProps)(createProjectFormWithFormik);