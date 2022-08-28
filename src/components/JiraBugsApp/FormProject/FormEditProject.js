import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { submitFormModalActionDispatchReducer, updateProjectActionToSaga, getProjectCategoryActionDispatch } from '../../../redux/actions/JiraBugsAction'
const FormEditProject = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;
    const dispatch = useDispatch();
    const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer)
    // const submitForm = (e) => {
    //     //e.preventDefault();
    //     alert('submit edit')
    // }
    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }
    useEffect(() => {
        dispatch(getProjectCategoryActionDispatch())
        dispatch(submitFormModalActionDispatchReducer(handleSubmit))

    }, [])
    return (
        <form className="container-fuild" onSubmit={() => handleSubmit}>
            <div className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>

                        <select name='categoryId' className='form-control' value={values.categoryId} onChange={handleChange} >

                            {arrProjectCategory?.map((item, index) => {
                                return <option value={item.id} key={`categoryName${item.id}`}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            name='description'

                            value={values.description}
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
                </div>
            </div>
        </form >
    )
}
const editProjectFormWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props;
        return {
            id: projectEdit?.id,
            projectName: projectEdit?.projectName,
            categoryId: projectEdit?.categoryId,
            description: projectEdit?.description,
        }
    },
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {

        console.log(props)
        console.log("values ", values)
        props.dispatch(updateProjectActionToSaga(values));

    },


    displayName: 'editProjectFormik',
})(FormEditProject);

const mapStateToProps = (state) => ({

    projectEdit: state.SingleProjectReducer.projectEdit

})

export default connect(mapStateToProps)(editProjectFormWithFormik);