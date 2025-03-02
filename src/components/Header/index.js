import { connect } from 'react-redux'
import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png'
import { setUser } from '../../redux/actions/login'
import './index.less'


function Header(props) {
  const {user} = props
  const [isOpenSwitch, setOpenSwitch] = useState(false)
  const navigate = useNavigate()
  const switchBtn = () => {
    setOpenSwitch(!isOpenSwitch)
  }

  const loginout = () => {
    props.setUser({})
    localStorage.removeItem('save')
    navigate('/login')
  }

  const toLogin = () => {
    navigate('/login',{
      replace: true
    })
  }

  const toSign = () => {
    navigate('/sign',{
      replace: true
    })
  }
  return (
    <div className="header">
        <div className="logo" >
            <img src={logoImg} alt=""  />
            <span>学生成绩管理系统</span>
        </div>
        {
          user.token? (
            <div className='user1' onClick={switchBtn}>
              <span>{user.userNumber}</span><span className={isOpenSwitch?'arrowOpen':'arrowClose'}></span>
              {
                isOpenSwitch? (
                  <ul className='loginout' onClick={loginout}>
                    <li>退出登录</li>
                  </ul>
                ):null
              }

            </div>
          ):(
            <div className='user'>
              <span onClick={toLogin}>登录</span> / <span onClick={toSign}>注册</span>
            </div>
          )
        }

    {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
    </div>
  )
}

export default connect(
  ({login}) => {
    return {
      ...login
    }
  },
  {
    setUser
  }
)(Header)
