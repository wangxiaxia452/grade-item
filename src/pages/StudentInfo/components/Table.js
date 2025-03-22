import { Button, Table } from 'antd';
import { useState } from 'react';

const operateBtn = [
    {
        label:'查看',
        bgColor: '#f9970e',
        type:'view'
    },
    {
        label:'编辑',
        bgColor: '#00b96b',
        type:'edit'
    },
    {
        label:'删除',
        bgColor: '#ff4d4f',
        type:'delete'
    },
]


 
export default (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const columns = [
    {
      title: '学号',
      dataIndex: 'stuID',
      // key: 'stuID',
      align:'center'
    },
    {
      title: '姓名',
      dataIndex: 'stuName',
      // key: 'name',
      align:'center'
    },
    {
      title: '性别',
      dataIndex: 'stuGender',
      // key: 'gender',
      align:'center',
      render: (_, record) => {
        const {stuGender} = record
        return stuGender === 'female'?'女':'男'
      }
    },
    {
      title: '班级',
      dataIndex: 'stuGrade',
      // key: 'gender',
      align:'center',
      render: (_, record) => {
        return _+"班"
      }
    },    
    {
      title: '操作',
      dataIndex: 'stuID',
      align:'center',
      render:(_, record) => (
          <div>
             {
                 operateBtn.map((item,index) => 
                   <Button
                     key={index}
                     className='operateBtn'
                     type='primary' 
                     size='small' 
                     style={{
                         background:item.bgColor,
                         fontSize:'12px',
                         marginLeft:'6px'
                     }}
                     onClick={() => showModal(item.type, record)}
                    >{item.label}</Button>
                 )
             }
          </div>
        ),
    }
  ];
  const {stuInfo, showModal} = props
  return (
    <div className='stu_table'>
      <Table 
        bordered
        size= 'middle'
        // rowClassName='stu_table'
        rowSelection={rowSelection}
        rowKey={(record) => {
           return record.stuID
        }}
        columns={columns} 
        dataSource={stuInfo} 
        pagination={{
            total:stuInfo.length,
            defaultPageSize:10,
            defaultCurrent:1,
            showSizeChanger:true,
            // showQuickJumper:true,
            pageSizeOptions: [10, 20, 50],
            showTotal:(total) => `共 ${total} 条`,
            // onChange: (page) => {
            //   log
            // }
            // showTitle:true
        }}
        loading={stuInfo?false:true}
        // onChange={(e) => {console.log('object',page)}}
      />
    </div>
  );
};


