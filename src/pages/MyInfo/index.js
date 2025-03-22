import React, { PureComponent } from 'react'
import {
  connect
} from 'react-redux'
import {  Switch, Button,Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { saveCommonInfo } from '../../redux/actions/common';
import { getStudentGradeAsyn } from '../../redux/actions/stuGrade'
import { stuPreGrades } from '../../services/query'
import './index.less'


class MyInfo extends PureComponent {
  constructor(props){
    super(props)
  }

  onChange = (checked) => {
    const handleSwitch = (checked) => {
        this.props.saveCommonInfo({
            isAllowImportHistorySwitch: checked
        })
        localStorage.setItem('isAllowImportHistorySwitch', checked)
    }
    if(checked) {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '请先将上一次成绩导入历史库!',
            okText: '导入',
            cancelText: '取消',
            onOk: () => {
                handleSwitch(true)
                const { stuGrade } = this.props
                stuPreGrades({preList: stuGrade}).then(res => {

                })
            },
            onCancel: () => {
                handleSwitch(false)
            }
        });
    }else{
        handleSwitch(false)
    }
  };

  componentDidMount() {
    this.props.getStudentGradeAsyn()
  }

  render() {
    const { user, isAllowImportHistorySwitch } = this.props
    console.log('wxnnnnn',this.props);
    return (
      <div className='container'>
        {/* <div className='import-btn'>
          <Button  
             type="primary" 
             block 
             disabled={user.userNumber !== 20250001 || user.userNumber === 20250001 && isAllowImportHistorySwitch}>
              将成绩导入历史库
          </Button>
        </div> */}
        <div className='policy-switch'>
            <span>是否打开编辑成绩权限：</span>
            <Switch
                checked={user.userNumber === 20250001 && isAllowImportHistorySwitch}
                disabled={user.userNumber !== 20250001} 
                onChange={this.onChange} 
            />
        </div>
         {/* onClick={importPreGrade} */}
      </div>
    )
  }
}

export default connect(
    ({login, common, stuGrade}) => {
        return {
          ...login,
          ...common,
          stuGrade
        }
      },
  {
    saveCommonInfo,
    getStudentGradeAsyn
  }
)(MyInfo)
