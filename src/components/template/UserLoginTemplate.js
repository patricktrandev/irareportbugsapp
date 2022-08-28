import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Slider } from 'antd';
const { Header, Content, Sider } = Layout;
export const UserLoginTemplate = (props) => {


    const [size, setSize] = useState({
        width: window.innerWidth, height: window.innerHeight
    })

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    }, [])

    const { Component, ...restRoute } = props;

    return (
        <Route {...restRoute} render={(propsRoute) => {
            return <>
                <Layout>
                    <Sider width={size.width / 3 * 2} style={{ height: size.height, backgroundImage: 'url(./img/bg1.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    </Sider>
                    <Content>
                        <Component {...propsRoute} />
                    </Content>

                </Layout>

            </>
        }} />
    )
}
