import React from 'react'
import { Button } from 'antd'
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGNIN_API } from '../../redux/constant/UserConstant'
import { signinJiraAction } from '../../redux/actions/JiraBugsAction'
const LoginJira = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <form onSubmit={handleSubmit} className='container' style={{ height: window.innerHeight }} >
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}  >
                <h3 className='text-center text-primary'>Jira Report Bugs</h3>
                <div className='d-flex mt-5'>
                    <Input onChange={handleChange} type='text' name='email' size="large" placeholder="Enter your email..." prefix={<UserOutlined />} />
                    <br />

                </div>
                <span className='text-danger'>{errors.email}</span>
                <div className='d-flex mt-1' >
                    <Input onChange={handleChange} type='password' name='password' size="large" placeholder="Enter your password..." prefix={<LockOutlined />} />
                    <br />

                </div>
                <span className='text-danger'>{errors.password}</span>
                <Button htmlType='submit' className='mt-4' style={{ width: '40%', backgroundColor: 'rgb(102,117,223)', color: '#fff' }} shape='round' size='large'>Log in</Button>
                <div className='social mt-3 d-flex flex-row'>
                    <Button type='primary mr-3 ' shape='circle' ><FacebookOutlined /></Button>
                    <Button type='danger' shape='circle' align="middle" ><TwitterOutlined /></Button>
                </div>

            </div>




        </form >
    )
}
const loginFormwithFormik = withFormik({
    mapPropsToValues: () => ({ emaiL: '', password: '' }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('Email is invalid'),
        password: Yup.string().min(6, 'Too short').max(32, 'Too long').required('Password is required!')
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(signinJiraAction(values.email, values.password))
        console.log(props)
    },


    displayName: 'LoginJira',
})(LoginJira);

export default connect()(loginFormwithFormik);