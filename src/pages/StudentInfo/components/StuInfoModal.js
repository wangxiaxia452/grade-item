import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Input, Radio, Form, notification} from 'antd';
import { useEffect } from 'react';
// import { useState } from 'react';

import './StuInfoModal.less'
const prefix = 'grade-edit-modal'

const FormItem = Form.Item
const genderList = [
  {key: 'female', val: '女'},
  {key: 'male', val: '男'}
]
export default (props) => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  

  const { 
    isModalOpen,
    type,
    handleOk, 
    handleCancel,
    //输入字段
    stuID,
    stuName,
    stuGender,
    changeValue
  } = props

  useEffect(() => {
    if(type === 'edit'){
      form.setFieldsValue({
        stuID,
        stuName,
        stuGender
      })
    }
    // else if(!isModalOpen){
    //   form.setFieldsValue({
    //     stuID:'',
    //     stuName:'',
    //     stuGender:''
    //   })
    // }
  },[stuID,stuName,stuGender])

  const handleOkk = () => {
    
    form.validateFields()
    .then(res => {
      if(handleOk) {
        handleOk(() => {
          api.error({
            message: 'err tip',
            description: '学号重复！',
          });
        })
      }
    })
    .catch(({values}) => {
      const {stuID, stuName, stuGender} = values
      if(!stuID || !stuName || !stuGender) return;
    })
  }
  return (
    <div className='_modal'>
      {contextHolder}
      <Modal
        wrapClassName ={`${prefix}`}
        bodyStyle={type==='delete'?{
            height:100
        }:{height:260}}
        width={400}
        title={`${type === 'add'?"添加":type === 'view'?"查看":type === 'edit'?"编辑":"删除"}学生信息`}
        open={isModalOpen} 
        onOk={handleOkk} 
        onCancel={handleCancel}>
        {
          type === 'delete'? (
            <h4 style={{textAlign:'center'}}>确认要删除吗？</h4>
          ):type === 'view'?(
            <>
            <p>
                <span>学号:</span>
                <span>{stuID}</span>
            </p>
            <p>
                <span>姓名:</span>
                <span>{stuName}</span>
            </p>
            <p>
                <span>性别:</span>
                <span>{stuGender === 'female'?'女':'男'}</span>
            </p>
            </>
          ):(
          <Form form={form}>
            <FormItem 
            label="学号:"
            name="stuID" 
            rules={[
              {
                required: true,
                message: '请输入学号!',
              },
              // ({ getFieldValue }) => ({
              //   validator(_, value) {
              //     // if (!value) {
              //     //   return Promise.resolve();
              //     // }
              //     console.log('bb',stuInfo)
              //     // stuInfo.forEach( e => {
              //     //   if(e.stuID === value) {
              //     //     return Promise.reject(new Error('学号重复!'));
              //     //   }

              //     // })
              //   },
              // }),
            ]}
            validateTrigger='onBlur'
            
            >
                <Input
                  name="stuID"             
                  value={stuID}
                  onChange={e => changeValue(e, 'stuID')}
                  disabled={type==='edit'?true:false}
                />
            </FormItem>
            <FormItem 
              label="姓名:"
              name="stuName"
              rules={[
                {
                  required: true,
                  message: '请输入姓名!',
                },
              ]}
              validateTrigger='onBlur'
            
            >
                <Input
                    name="stuName"
                    value={stuName}
                    onChange={e => changeValue(e, 'stuName')}
                />
            </FormItem>
            <FormItem 
            label="性别:"
            name="stuGender"
            rules={[
              {
                required: true,
                message: '请输入性别!',
              },
            ]}
            >
              <Radio.Group
                  name="stuGender"
                  value={stuGender}
                  onChange={e => changeValue(e, 'stuGender')}
              >
                {
                  genderList.map(item => {
                     const {key, val} = item
                     return <Radio value={key} key={key}>{val}</Radio>
                  })
                }
                
              </Radio.Group>
            </FormItem>
          </Form>

          )
        }
      </Modal>
    </div>
  )
}
