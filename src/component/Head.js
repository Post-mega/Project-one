import React, { Component } from 'react'
import { Link} from "react-router-dom";
import { Layout, Menu} from 'antd';
const {Header} = Layout

class Head extends Component {
    render() {
        return (
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                {/* <Link to="/">首页</Link>
                        <Link to="/docs">文档</Link> */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    onClick={this.hanleClick}
                    // onSelect={this.onSelect}
                    // selectedKeys={this.state.selectedKeys}
                    // defaultSelectedKeys={['首页']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/"><Link to="/">首页</Link></Menu.Item>
                    <Menu.Item key="/docs"><Link to="/docs">文档</Link></Menu.Item>
                    <Menu.Item key="/admin"><Link to="/admin">后台</Link></Menu.Item>
                    {/* <Menu.Item key="/test"><Link to="/test">测试</Link></Menu.Item> */}
                </Menu>
            </Header>
        )
    }
}

export default Head