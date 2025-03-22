import { Select, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import './index.less'

const { Search } = Input

const options = [
    {
        label: '三年级',
        options: [
            {
                label: '三一班',
                value: '31',
            },
            {
                label: '三二班',
                value: '32',
            },
            {
                label: '三三班',
                value: '33',
            },
        ],
    },
    {
        label: '四年级',
        options: [
            {
                label: '四一班',
                value: '41',
            },
            {
                label: '四二班',
                value: '42',
            },
            {
                label: '四三班',
                value: '43',
            },
        ],
    },
    {
        label: '五年级',
        options: [
            {
                label: '五一班',
                value: '51',
            },
            {
                label: '五二班',
                value: '52',
            },
            {
                label: '五三班',
                value: '53',
            },
        ],
    },
]

export default function GradeList(props) {

  const { pathname } = useLocation()

  const {
    classChoose,
    handleClassChange,
    subjectChoose,
    handleSubjectChange,
    showModal
  } = props


  return (
    <div className='topContent'>
        <div className='class_sel'>
            <span>班级：</span>
            <Select
            // defaultValue="41"
            style={{
                width: 120

            }}
            value={classChoose}
            // dropdownMatchSelectWidth={false}
            // popupMatchSelectWidth={true}
            onChange={handleClassChange}
            options={options}
            />
        </div>
        {
            pathname === '/addGrade'?(
                <div className='subject_sel'>
                    <span>学科：</span>
                    <Select
                        value={subjectChoose}
                        onChange={handleSubjectChange}
                        style={{
                        width: 120,
                        }}
                        // allowClear
                        options={[
                        {
                            value: 'chinese',
                            label: '语文',
                        },
                        {
                            value: 'math',
                            label: '数学',
                        },
                        {
                            value: 'english',
                            label: '英语',
                        },
                        ]}
                    />
                </div>
            ):null
        }

        <div className='rightDiv'>
            <Search 
            placeholder="搜索" 
            allowClear
            // enterButton
            style={{
                width:120,
                float:'right',
                marginLeft: '10px'
            }}
            />
            {
                pathname === '/stuInfo'?(
                    <Button 
                        type="primary"  
                        icon={<PlusOutlined />}
                        style={{
                            float:'right',
                            width: 40
                        }}
                        onClick={() => showModal('add')}
                    />
                ):null
            }

            
        </div>
    </div>
  )
}
