import { UserOutlined, PlusCircleOutlined, FieldNumberOutlined } from '@ant-design/icons';
import React from 'react'
import { Menu, theme, Layout} from 'antd';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const items = [
    {
        key: '/stuInfo',
        icon: React.createElement(UserOutlined),
        label: '学生信息'
    },
    {
        key: '/addGrade',
        icon: React.createElement(PlusCircleOutlined),
        label: '添加成绩'
    },
    {
        key: '/allGrades',
        icon: React.createElement(FieldNumberOutlined),
        label: '总成绩'
    },
]



export default function LeftNav() {
  const navigate = useNavigate()

  const goTo = (e) => {
      navigate(e.key, {
          replace: true
      })
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Sider
        width={200}
        style={{
        background: colorBgContainer,
        }}
    >
        <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['/stuInfo']}
        style={{
            height: '100%',
            borderRight: 0,
        }}
        items={items}
        onClick={goTo}
        />
    </Sider>
  )
}
