/**
 * 双层跳转
 * link 标签携带参数
 * 组件接受参数
 * 参数保存在 param 中
 */

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from 'antd';
import './App.css';
import Middle from './component/Middle.js'
import Home from './component/Home.js'
import Admin from './component/Admin.js'
import Head from './component/Head.js'

import CustomLinkExample from './component/customeLink'





/**
 * 程序的入口
 * 主要渲染顶部的导航栏部分
 * 调用组件：
 * Middle
 * Home
 * Page
 * Admin
 */
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            json: [],
            titleList: new Map(),
            // selectedKeys: ['/admin'],
        }
    }

    /**
     * 在组件挂载前请求一次全部数据，后台返回 md.json
     * 将json数据保存到本地，this.state.json
     * 同时将数据以 [文章名 => 目录名] 的格式转存到titleList中
     * 方便后续获取文章内容时，反查文章目录使用
     */
    componentWillMount() {
        fetch('http://localhost:3001/build', { method: 'get', })
            .then(e => e.json())
            .then((data) => {
                console.log('APP willmount: ', data)

                var List = new Map()
                data.map((value) => (
                    value.docs.map(title => (
                        // List[title] = value.title
                        List.set(title,value.title)
                    ))
                ))
                console.log('APP willmount, LIST: ', List)
                // 将数据保存到 json 里
                this.setState({
                    json: data,
                    titleList: List
                })
                // console.log(this.state)
            })
    }

    // Menu 菜单点击的处理函数
    hanleClick = (e) => {
        console.log(e.key)
    }

    // onSelect = (info) => {
    //     console.log('onSelect info: ', info)
    //     this.setState({
    //         selectedKeys: info.selectedKeys,
    //     });
    //     console.log(this.state.selectedKeys)
    // };

    // 获取地址栏上输入的 URL
    componentDidMount = () => {
        console.log('did mount, this.props', this.props)
        this.onOpenClick()
    }

    /**
     * 从 this.props 中获取地址栏中的 pathname
     * 保存到 openKeys 和 selectedKeys 中
     * 控制 Menu 的展开
     */
    onOpenClick = (e) => {
        console.log('e: ', e)
        console.log(this.props.history)
        // var location = this.props.location.pathname.split('/')[2]
        // console.log(location)
    }

    // 拒绝组件的第一次更新请求
    shouldComponentUpdate(){
        console.log(this.props.length)
        if(!this.state.titleList.length === 0 || !this.props){
            return false
        }
        return true
    }
    // 渲染顶部的导航栏
    render() {
        return (
            <Router>
                <Layout>
                    {/* 顶部导航栏 */}
                    <Head />
                    {/* 跳转到首页组件 */}
                    <Route exact path="/" render={(props) => <Home {...props} />} />
                    {/* 跳转到中部显示页面，拒绝第一次渲染，避免 titleList 为空 */}
                    <Route path="/docs" render={(props) =>{if(this.state.json.length === 0) return null; return <Middle  {...props} titleList={this.state.titleList} json={this.state.json}  />}} />
                    {/* <Route path='/docs' render={(props) => <Middle {...props} />} /> */}
                    <Route path='/admin' render={(props) => <Admin {...props} />} />
                    <Route path='/test' render={() => <CustomLinkExample /> } />
                </Layout>
            </Router>
        )
    }
}


export default App;
