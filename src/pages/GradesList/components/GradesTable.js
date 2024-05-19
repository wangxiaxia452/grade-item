import { Table } from 'antd';
const columns = [
  {
    title: '学号',
    dataIndex: 'stuID',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'stuName',
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: 'stuGender',
    align: 'center',
    render: (text, record) => {
      return text === 'female'?'女':'男'
    }
  },
  {
    title: '语文',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
    align: 'center'
  },
  {
    title: '数学',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    align: 'center'
  },
  {
    title: '英语',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
    align: 'center'
  },
  {
    title: '总分',
    dataIndex: 'grades',
    render: (_, record) => {
        const {chinese, math, english} = record
        return parseInt(chinese) + parseInt(math) + parseInt(english)
    },
    sorter: {
      compare: (a, b) => {
          const {chinese:c1, math:m1, english:e1} = a
          const {chinese:c2, math:m2, english:e2} = b
          console.log()
          return (parseInt(c1)+parseInt(m1)+parseInt(e1))-(parseInt(c2)+parseInt(m2)+parseInt(e2))
      },
      multiple: 1,
    },
    align: 'center'
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
export default (props) => {
    const {stuGrade} =  props
    return (
        <div className='stu_table'>
        <Table 
          bordered
          size= 'middle'
          // rowClassName='stu_table'
        //   rowSelection={rowSelection}
          rowKey={(record) => {
             return record.stuID
          }}
          columns={columns} 
          dataSource={stuGrade} 
          pagination={{
              total:7,
            //   pageSize:5,
              showSizeChanger:true,
              showQuickJumper:true,
              pageSizeOptions: [5, 10, 20],
              showTotal:(total) => `共 ${total} 条`,
              showTitle:true
          }} 
        />
      </div>
    )
}
