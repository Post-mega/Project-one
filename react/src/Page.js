import React, { Component } from "react";
import { Layout, Row, Col } from 'antd';
import $ from 'jquery'



const { Content, Footer } = Layout;

/**
 * 显示文章
 * 被 Middle 组件调用
 * 接收参数：page
 * 
 */
class Display extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        var { page } = this.props
        // console.log($('.wrap'))
        $('.wrap').html(page)
        return (
            <Layout>
                <Content className='wrap'></Content>
                <Foot />
            </Layout>
        )
    }
}

const Box = props => <p className={`height-${props.height}`}>{props.children}</p>

class Foot extends Component {
    render() {
        return(
            <Footer className='foot'>
                <Row type="flex" justify="space-around">
                    <Col span={4}><Box height={100}>上一篇</Box></Col>
                    <Col span={4}><Box height={100}>下一篇</Box></Col>
                </Row>
            </Footer>
        )
    }
}

export default Display