import { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import HeaderContent from '../../components/HeaderContent'
import GradesTable from './components/GradesTable';
import { getStudentGradeAsyn } from '../../redux/actions/stuGrade'
import './index.less'


function GradeList(props) {
  const [classChoose, setClassChoose] = useState('41')
  const handleClassChange = (value) => {
    setClassChoose(value)
    props.getStudentGradeAsyn({classChoose:value})
  };

  const state = {
    classChoose,
    handleClassChange
  }

  useEffect(()=> {
    props.getStudentGradeAsyn({classChoose})
  },[])

  return (
    <div className='_gradeslist'>
        <HeaderContent {...state}/>
        <GradesTable {...props}/>
    </div>
  )
}

export default connect(
  state => {
    return {
      stuGrade: state.stuGrade
    }
  },
  {
    getStudentGradeAsyn
  }
)(GradeList)
