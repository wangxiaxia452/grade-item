import { Button, Modal, InputNumber } from 'antd';
import { useEffect, useState } from 'react';

import './GradeEditModal.less'
const prefix = 'grade-edit-modal'
export default (props) => {
    const [grade, setGrade] = useState(0);
    function onChange(value) {
      setGrade(value)
    }
  const { 
    isModalOpen,
    handleOk, 
    handleCancel,
    stuGradeInfo={},
    subjectChoose
  } = props
  const {stuID, stuName} = stuGradeInfo

  useEffect((a,b)=> {
    if(isModalOpen && grade !== stuGradeInfo[subjectChoose]){
      setGrade(stuGradeInfo[subjectChoose]?stuGradeInfo[subjectChoose]:0)
    }
  },[stuGradeInfo])

  return (
    <div className='_modal'>

      <Modal
        wrapClassName ={`${prefix}`}
        bodyStyle={{
            height:260
        }}
        width={400}
        title="编辑成绩" 
        open={isModalOpen} 
        onOk={() => handleOk(grade)} 
        onCancel={handleCancel}>
        <div className='edit_item'>
            <span>学号:</span>
            <span>{stuID}</span>
        </div>
        <div className='edit_item'>
            <span>姓名:</span>
            <span>{stuName}</span>
        </div>
        <div className='edit_item'>
            <span>成绩:</span>
            <InputNumber 
              min={0} 
              max={100} 
              value={grade} 
              size="small"
              onChange={onChange}
            />
        </div>
      </Modal>
    </div>
  );
};
