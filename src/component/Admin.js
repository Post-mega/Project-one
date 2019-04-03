import React, { Component } from "react"
import { Layout } from 'antd';
import '../App.css'

const { Content } = Layout


/**
 * 后台管理页
 * 对应顶部导航栏的首页按钮
 * 暂时不处理
 */
class Admin extends Component {
    render() {
        return (
            <Layout>
                <Content className='home'>
                    ADMIN
                </Content>
            </Layout>
        )
    }
}

export default Admin