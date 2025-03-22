import React, { useState, useEffect } from 'react'
import {
  connect
} from 'react-redux'
import {addStuInfo, editStuInfo, delStuInfo} from '../../services/query'
import HeaderContent from '../../components/HeaderContent'
import Table from './components/Table'
import Modal from './components/StuInfoModal'
import { getStudentInfoAsyn } from '../../redux/actions/stuInfo'
import './index.less'

function StudentInfo(props) {
  const [classChoose, setClassChoose] = useState('31')
  const [isModalOpen, setVisible] = useState(false)
  const [type, setType] = useState('')
  const [stuID, setStuID] = useState('')
  const [stuName, setStuName] = useState('')
  const [stuGender, setStuGender] = useState('')
  const [stuGrade, setStuGrade] = useState('')
  const [stuClass, setStuClass] = useState('')

  const showModal = (type, record = null) => {
    setVisible(true)
    setType(type)
    if(record){
      const {stuID, stuName, stuGender, stuGrade: stuGradeAll} = record
      const stuGrade = stuGradeAll.split('')[0]
      const stuClass = stuGradeAll.split('')[1]
      setStuID(stuID)
      setStuName(stuName)
      setStuGender(stuGender)
      setStuGrade(stuGrade)
      setStuClass(stuClass)
    }

  };

    const handleOk = (callback = null) => {
      if(type === 'add'){
        addStuInfo({stuID, stuName, stuGender, stuGrade: stuGrade+''+stuClass}).then( res => {
          const { data: {code}} = res
          if(code === '0000'){
            props.getStudentInfoAsyn({classChoose})
            setVisible(false)
          }else if(code === '1111'){
            const { data: {err}} = res
            if(stuID === err.keyValue.stuID){
              callback()
            }
          }
        }).catch( err => {
          console.log('err',err)
        })
      }else if(type === 'edit'){
        editStuInfo({stuID, stuName, stuGender, stuGrade: stuGrade+''+stuClass}).then(res => {
          const { data: {code}} = res
          if(code === '0000'){
            props.getStudentInfoAsyn({classChoose})
            setVisible(false)
          }
        })
      }else if(type === 'delete'){
        delStuInfo({stuID}).then(res => {
          const { data: {code}} = res
          if(code === '0000'){
            props.getStudentInfoAsyn({classChoose})
            setVisible(false)
          }
        })
      }
      else{
        setVisible(false)
      }
    };

    const resetInfo = () => {
      setStuID('')
      setStuName('')
      setStuGender('')
      setStuGrade('')
      setStuClass('')
    }
    const handleCancel = () => {
      setVisible(false)
      resetInfo()
    };
    const changeValue = (e, tag) => {
      const list = {
        'stuID': setStuID,
        'stuName': setStuName,
        'stuGender': setStuGender,
        'stuGrade': setStuGrade,
        'stuClass':setStuClass
      }
      if(Object.prototype.toString.call(e)==='[object Object]'){
        list[tag](e.target.value)
      }else{
        list[tag](e)
      }
    }

    const handleClassChange = (value) => {
      setClassChoose(value)
      props.getStudentInfoAsyn({classChoose:value})
    };
    const state = {
      classChoose,
      isModalOpen,
      type,
      showModal,
      handleOk,
      handleCancel,
      stuID,
      stuName,
      stuGender,
      stuGrade,
      stuClass,
      changeValue,
      handleClassChange
    }
    useEffect(()=> {
      props.getStudentInfoAsyn({classChoose})
    },[])
    

  return (
    <div>
      <HeaderContent  {...state} />
      <Table {...state} {...props}/>
      <Modal {...state}/>
    </div>
  )
}

export default connect(
  state => {
    return {
      stuInfo: state.stuInfo
    }
  },
  {
    getStudentInfoAsyn
  }
)(StudentInfo)
