import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as XLSX from 'xlsx';
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { upload } from '../../services/query'
import './index.less'

function ImportExcel(props) {
  const [excelData, setExcelData] = useState([]);
  const [isAnimate, setAnimate] = useState(false)


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      upload({list: jsonData}).then(res => {
          const { data: {code, msg} } = res
          if(code === '0000') {
              message.success(msg)
          }else if(code === '1111') {
              message.error(msg+',请重新上传')
          }
      })
      setExcelData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const onDownload = url => {
      const eleLink = document.createElement('a')
      eleLink.style.display = 'none'
      eleLink.href = url
      eleLink.download = '成绩单模板.xlsx'
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
  }

  return (
    <div className='container-box'>
      <div className={props.isAllowImportHistorySwitch?"show-input":"show-input-disabled"}>
          <UploadOutlined style={{ fontSize: '18px',marginRight:'8px',verticalAlign:'middle' }} />
          导入学生成绩（仅支持excel格式）
      </div>
      <p className='download' onClick={() => onDownload('gradelist.xlsx')}>下载成绩单模板</p>
      <input 
        disabled={!props.isAllowImportHistorySwitch} 
        className={props.isAllowImportHistorySwitch?'input-set':'input-set input-set--disabled'} 
        type="file" 
        onChange={handleFileUpload} 
      />
    </div>
  );
}

export default connect(
  state => {
    return {
      ...state.common
    }
  },
  null
)(ImportExcel);