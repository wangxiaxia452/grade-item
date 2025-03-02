import React, { PureComponent } from 'react'
import {
  connect
} from 'react-redux'
// import { PlusOutlined } from '@ant-design/icons';
import { Form, Select, Input, Button, message } from 'antd';
import { register } from '../../services/query'
import { withNavigation } from '../../hoc';
import './index.less'

const { Search } = Input

class Auth extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      userNo: '',
      email: '',
      password:'',
      passwordConfirm: ''
    }
  }
  changeHandle = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]:value
    })
  }

  submit = () => {
    const {
      userNo,
      email,
      password,
      passwordConfirm
    } = this.state
    // if(!userNo || !email || !password ||!passwordConfirm)return
    const labelList = {
      userNo: '账号',
      email:'邮箱',
      password:'密码',
      passwordConfirm:'确认密码'
    }
    const errs = {}
    Object.entries(labelList).map(e => {
      if(!this.state[e[0]]) {
        errs[e[0]] = `${e[1]}不能为空！`
      }else {
        delete errs[e[0]]
      }
      this.setState({
        errs
      })
    })
    if(JSON.stringify(errs) !== '{}') return;
    register({
      userNo,
      email,
      password,
      passwordConfirm
    }).then(res => {
      const { data: {
        code,
        msg,
        errs
      } } = res
      if(code === '0000') {
        message.success(msg, 3, ()=> {
          this.props.navigate('/login')
        });

      }else {
        message.error(msg)
        this.setState({
          errs
        })
      }
      
    })
  }

  toLogin = () =>  {
    this.props.navigate('/login')
  }

  render() {
    const {
      userNo,
      email,
      password,
      passwordConfirm,
      errs
    } = this.state
    return (
      <div className='authDiv'>
        <div className='input-box'>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            // initialValues={{
            //   remember: true,
            // }}
            // onFinish={this.submit}
            // onFinishFailed={this.FinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="账号"
              // validateTrigger='onBlur'
            >
              <Input 
                name="userNo"
                value={userNo}
                onChange={this.changeHandle}
                placeholder='请输入您的账号(仅支持数字格式)'
              />
              {errs && errs.userNo? <span style={{color: 'red',position:'absolute', top: '30px', left: '0'}}>{errs.userNo}</span>: null}
            </Form.Item>
            <Form.Item
              label="邮箱"
              // validateTrigger='onBlur'
            >
              <Input 
                name="email"
                value={email}
                onChange={this.changeHandle}
                placeholder='请输入您的邮箱'
              />
              {errs && errs.email? <span style={{color: 'red',position:'absolute', top: '30px', left: '0'}}>{errs.email}</span>: null}
            </Form.Item>
            <Form.Item
              label="密码"
              // validateTrigger='onBlur'
            >
              <Input.Password 
                name="password"
                value={password}
                onChange={this.changeHandle}              
                placeholder='请输入您的密码' 
              />
              {errs && errs.password? <span style={{color: 'red',position:'absolute', top: '30px', left: '0'}}>{errs.password}</span>: null}
            </Form.Item>
            <Form.Item
              label="密码确认"
              // validateTrigger='onBlur'
            >
              <Input.Password
                name="passwordConfirm" 
                value={passwordConfirm}
                onChange={this.changeHandle}               
                placeholder='请再次输入您的密码' 
              />
              {errs && errs.passwordConfirm? <span style={{color: 'red',position:'absolute', top: '30px', left: '0'}}>{errs.passwordConfirm}</span>: null}
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item label={null} className="button-formitem">
              <Button type="primary" htmlType="submit" onClick={this.submit}>
                注册
              </Button>
            </Form.Item>
          </Form>
          <p className='to-tips'>已有账号，马上去<span onClick={this.toLogin}>登录</span></p>
          {/* <p className='to-tips'>还没有账号？<span >去注册</span></p> */}
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {

    }
  },
  {
    // getStudentGradeAsyn
  }
)(withNavigation(Auth))
