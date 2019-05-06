import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import Display from '../Page/Page'

const { SubMenu } = Menu
const { Sider } = Layout

/**
 * 中部的导航栏部分
 * 
 * 文字显示调用 Display 组件
 * 
 */
class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: ["API 参考"],
            selectedKeys: ["helloWorld.md"],
        }
    }
    // 处理 MenuItem 的点击
    menuClick = (e) => {
        // 获取当前点击的文章名
        this.getOnePage(e.key)
    }

    // 从后台获取一篇文章
    getOnePage = (title) => {
        // 根据文章名查询到目录名
        var dir = this.props.titleList.get(title)
        // console.log('')
        // console.log('title: ', title)
        // console.log('dir: ', dir)
        // 请求后台
        fetch('http://localhost:3001/docs', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title: title,
                dir: dir
            })
        })
        // 后台以 json 格式发送数据
        .then(e => e.json())
        // 将取到的数据保存到 this.state.page 中
        .then((html) => {
            this.setState({
                page: html
            })
        })
    }

    // 获取地址栏上输入的 URL
    componentDidMount = () => {
        this.onOpenCheck()
    }

    /**
     * 从 this.props 中获取地址栏中的 pathname
     * 保存到 openKeys 和 selectedKeys 中
     * 控制 Menu 的展开
     */
    onOpenCheck = () => {
        // console.log(this.props)
        // 获取当前地址栏中的地址
        var location = this.props.location.pathname.split('/')[2]
        // console.log(location)
        // 在titleList中索引到当前的文件夹名
        // console.log(this.props)
        var openkey = this.props.titleList.get(location)
        // console.log(openkey)
        // 设置openKeys和selectedKeys
        this.setState({
            openKeys: this.state.openKeys.concat(openkey),
            selectedKeys: this.state.selectedKeys.concat(location)
        })
    }

    onSelect = (info) => {
        this.setState({
            selectedKeys: info.selectedKeys,
        });
    };

    // 上方复选框取消选择
    onDeselect(info) {
        // console.log('deselect ', info);
    }

    // 鼠标滑过下方Menu
    onOpenChange = (openKeys) => {
        // console.log('onOpenChange ', openKeys);
        this.setState({
            openKeys,
        });
    };



    render() {
        var { match, json } = this.props
        // console.log('open key, this.state: ' , this.state)
        // console.log('Middle this.props: ', this.props)
        return (
            <Router>
                <Layout className='middle'>

                    {/* 侧边栏 */}
                    <Sider width={300} height={100} className="sider">
                        <Menu
                            mode="inline"
                            // multiple
                            // theme='dark'
                            // 默认打开的选项------------------------------------------
                            // defaultOpenKeys={[]}
                            // defaultSelectedKeys={}
                            onClick={this.menuClick}
                            onSelect={this.onSelect}
                            onDeselect={this.onDeselect}
                            onOpenChange={this.onOpenChange}
                            // 需要展开的key
                            openKeys={this.state.openKeys}
                            // 需要选中的key
                            selectedKeys={this.state.selectedKeys}
                            style={{ height: '100%', borderRight: 0, }}
                        >

                            {/* 循环打印 json 中的数据 */}
                            {json.map((value, key) => (
                                <SubMenu key={value.title} title={<span><Icon type="user" /> {value.title} </span>}>

                                    {/* 循环文件名 */}
                                    {value.docs.map((title, index) => (
                                        <Menu.Item key={title}>
                                            <NavLink key={index} to={`${match.url}/${title}`} >
                                                {title}
                                            </NavLink>
                                        </Menu.Item>
                                    )
                                    )}
                                </SubMenu>
                            ))}

                        </Menu>
                    </Sider>
                    {/* 文章内容部分，调用 Display 组件进行显示 */}
                    <Route exact path={`${match.url}/:ID`} render={(props) => <Display {...props} page={this.state.page} />} />
                    {/* 默认显示 */}
                    <Route path={match.url} exact render={() => <h3>Please select a topic.</h3>} />
                </Layout>

            </Router>
        )
    }
}



export default Content