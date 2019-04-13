import React, {Component} from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';


const { Content } = Layout

/**
 * 首页
 * 对应顶部导航栏的首页按钮
 * 暂时不处理
 */
class Home extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Content className='home'>
                        HOME
                    </Content>
                </Layout>
            </Router>
        )
    }
}

export default Home