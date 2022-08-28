import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { openModalActionDispatchReducer, closeModalActionDispatchReducer } from '../../../redux/actions/JiraBugsAction'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';





const { Option } = Select;

export const ModalJiraProject = (props) => {
    // const [visible, setVisible] = useState(false);
    const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.ModalJiraReducer)
    const dispatch = useDispatch()
    const showDrawer = () => {
        dispatch(openModalActionDispatchReducer())
    };

    const onClose = () => {
        dispatch(closeModalActionDispatchReducer())
    };
    return (
        <>
            {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New account
            </Button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => callBackSubmit()} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {ComponentContentDrawer}
            </Drawer>
        </>
    )
}
