import React, {Component} from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';
import './App.css'

const { Content } = Layout


/**
 * 后台管理页
 * 对应顶部导航栏的首页按钮
 * 暂时不处理
 */
class Admin extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Content className='home'>
                        ADMIN
                    </Content>
                </Layout>
            </Router>
        )
    }
}

export default Admin