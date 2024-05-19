import React from 'react'
import logoImg from '../../assets/images/logo.png'
import './index.less'


export default function Header() {
  return (
    <div className="header">
        <div className="logo" >
            <img src={logoImg} alt=""  />
            <span>学生成绩管理系统</span>
        </div>
    {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
    </div>
  )
}
