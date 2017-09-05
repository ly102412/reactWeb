import React,{Component} from "react";
import {Link} from "react-router";
import logo from "../images/logo.png";
import {Modal, Button,Form,Input,Tabs,Icon,message} from "antd";
import axios from "axios"

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;


class MobileHeader extends Component {

  state = {
    username: null,
    modalShow: false
  };

  componentDidMount(){
    const username = localStorage.getItem('username');
    if(username){
      this.setState({username});
    };
  };

  showModal = (isModal) => {
    this.setState({modalShow: isModal})
  };

  handleSubmit = (isLogin,event) => {
    event.preventDefault();
    const {username,password,r_userName,r_password,r_confirmPassword} = this.props.form.getFieldsValue()
    let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'

    if(isLogin) {
      url += `action=login&username=${username}&password=${password}`
    }else {
      url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    };

    axios.get(url)
      .then(response => {
        this.props.form.resetFields();
        const result = response.data;
        if(isLogin){
          if(!result){
            message.error('登录失败');
          }else {
            message.success('登录成功');

            const username = result.NickUserName;
            const userId = result.UserId;

            this.setState({username});

            localStorage.setItem('username', username)
            localStorage.setItem('userId', userId);
          }
        }else {
          message.success('注册成功')
        }
      })
    this.setState({modalShow: false})
  };

  logout = () => {
    this.setState({username: null});
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  };

  render () {
    const {username,modalShow} = this.state;
    const {getFieldDecorator} = this.props.form;
    const userShow = username
      ? (
        <span>
          <Icon type="logout" onClick={this.logout}/>
          <Link to='/user_center'><Icon type="inbox"/></Link>
        </span>
      )
      : <Icon type="setting" onClick={this.showModal.bind(this, true)}/>


    return (
      <div id="mobileheader">
        <header>
          <div>
            <Link to="/">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </Link>

            {userShow}

          </div>
        </header>

        <Modal
          title="用户中心"
          visible={modalShow}
          onOk={this.showModal.bind(this,false)}
          onCancel={() => {this.showModal(false)}}
          onText="关闭"
        >
          <Tabs type="card" onChange={() => this.props.form.resetFields()}>
            <TabPane tab="登录" key="1">
              <Form onSubmit={this.handleSubmit.bind(this,true)}>
                <FormItem label="用户名">
                  {getFieldDecorator('username')(
                    <Input type="text" placeholder="请输入用户名"/>
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('password')(
                    <Input type="text" placeholder="请输入密码"/>
                  )}
                </FormItem>
                <Button type='primary' htmlType="submit">登陆</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form onSubmit={this.handleSubmit.bind(this,false)}>
                <FormItem label="用户名">
                  {getFieldDecorator('r_userName')(
                    <Input type="text" placeholder="请输入用户名"/>
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password')(
                    <Input type="text" placeholder="请输入密码"/>
                  )}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator('r_confirmPassword')(
                    <Input type="text" placeholder="请输入确认密码"/>
                  )}
                </FormItem>
                <Button type='primary' htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
};
export default Form.create()(MobileHeader)
