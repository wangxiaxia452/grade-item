import React, { PureComponent } from 'react'
import {
  connect
} from 'react-redux'
import { Form, Select, Input, Button, message } from 'antd';
import { login } from '../../services/query'
import { loginAsync } from '../../redux/actions/login';
import { withNavigation } from '../../hoc'
import './index.less'

const { Search } = Input

class Login extends PureComponent {
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
      password
    } = this.state
    const labelList = {
      userNo: '账号',
      password:'密码'
    }
    const errs = {}
    Object.entries(labelList).map(e => {
      const reg = /^\d+$/
      if(!this.state[e[0]]) {
        errs[e[0]] = `${e[1]}不能为空`
      }else if(e[0] === 'userNo' && !reg.test(this.state['userNo'])) {
        errs['userNo'] = '账号仅支持数字格式'
      }else {
        delete errs[e[0]]
      }
      this.setState({
        errs
      })
    })
    if(JSON.stringify(errs) !== '{}') return;
    this.props.loginAsync({
      userNo,
      password
    }).then(res => {
      const { data: {code, msg, errs}} = res
      if(code === '1111'){
        if(errs){
          this.setState({
            errs
          })
        }else {
          message.error(msg)
        }
      }
      if(code === '0000') {
         this.props.navigate('/')
      }
    })
  }

  toRegister = () => {
    this.props.navigate('/sign')
  }

  render() {
    const {
      userNo,
      password,
      errs
    } = this.state
    return (
      <div className='loginDiv'>
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
            <Form.Item label={null} className="button-formitem">
              <Button type="primary" htmlType="submit" onClick={this.submit}>
                登录
              </Button>
              <div className='forgetpwd-tip'>忘记密码？</div>
            </Form.Item>
          </Form>
          <p className='to-tips'>还没有账号？<span onClick={this.toRegister}>去注册</span></p>
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      ...state
    }
  },
  {
    loginAsync
  }
)(withNavigation(Login))
