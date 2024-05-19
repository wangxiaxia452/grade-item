import React, { PureComponent } from 'react'
import {
  connect
} from 'react-redux'
// import { PlusOutlined } from '@ant-design/icons';
import { Select, Input, Button } from 'antd';
import { getStudentGradeAsyn } from '../../redux/actions/stuGrade'
import { addStuGrade, getStuPreGrades } from '../../services/query'
import maleImg from '../../assets/images/male.png'
import femaleImg from '../../assets/images/female.png'
import HeaderContent from '../../components/HeaderContent'
import Modal from './components/GradeEditModal';
import './index.less'

const { Search } = Input

const subjectList = [
  {
    key:'chinese',
    value:'语文',
  },
  {
    key:'math',
    value:'数学',
  },
  {
    key:'english',
    value:'英语',
  },
]


class GradeAdd extends PureComponent {

  state={
    currentIndex: '',
    isModalOpen: false,
    classChoose:'41',
    subjectChoose:'chinese'
  }

  showModal = (item) => {
    this.setState({
      isModalOpen: true,
      stuGradeInfo: item
    })
  };

  handleOk = (grade) => {
    const { classChoose, stuGradeInfo, subjectChoose } = this.state
    if(grade === stuGradeInfo[subjectChoose]) {
      this.setState({
        isModalOpen: false
      })
      return;
    };
    addStuGrade({
      ...stuGradeInfo,
      [subjectChoose]:grade
    }).then(res => {
      const { data: {code}} = res
      if(code === '0000'){
        this.props.getStudentGradeAsyn({classChoose})
        this.setState({
          isModalOpen: false
        })
      }else if(code === '1111'){
        const { data: {err}} = res
        // if(stuID === err.keyValue.stuID){
        //   callback()
        // }
      }
    })

  };
  handleCancel = () => {
        this.setState({
      isModalOpen: false
    })
  };

  handleClassChange = (value) => {
    this.setState({
      classChoose: value
    })
    this.props.getStudentGradeAsyn({classChoose:value})
  };

  getPreGradeFunc = (preList = [], curList = []) => {
    const { subjectChoose } = this.state
    let allInfoList = []
    preList && preList.map((e,i)=> {
      curList && curList.map( (e1,i1) => {
        if(e['stuID'] === e1['stuID']){
          allInfoList.push({
            ...e1,
            ['pre_'+subjectChoose]: e[subjectChoose]
          })
        }
      })
    })
    return allInfoList
  }

  handleSubjectChange = (value) => {
    this.setState({
      subjectChoose:value
    })
  }

  componentDidMount(){
    const { getStudentGradeAsyn } = this.props
    const {classChoose} = this.state
    getStudentGradeAsyn({classChoose})
    getStuPreGrades().then( res => {
      const { data, code } = res.data
      if(code === '0000'){
        this.setState({
          preList: data
        })
      }
    })
  }


  render() {
    const {
       currentIndex,
       subjectChoose,
       preList
    } = this.state
    const {stuGrade} = this.props
    const allInfoList = this.getPreGradeFunc(preList, stuGrade)
    return (
      <div>
        <HeaderContent
         {...this.state} 
         handleClassChange={this.handleClassChange}
         handleSubjectChange={this.handleSubjectChange}
        />
        <div className='grade_cards'>
          <ul>
            {
              allInfoList && allInfoList.map((item,index) => {
                return (
                  <li 
                  key={index}
                  // className={item.gender === '男'?'male_color':'female_color'}
                  onMouseEnter={()=> {
                    this.setState({
                      currentIndex: index
                    })
                  }}
                  onMouseLeave={()=> {
                    this.setState({
                      currentIndex: ''
                    })
                  }}

                >
                    {
                      currentIndex === index?(
                        <p className='btn_card' >
                          <Button 
                            type="primary" 
                            size='small' 
                            ghost
                            onClick={() => this.showModal(item)}
                        >编辑成绩</Button>
                        </p>
                      ):null
                    }
                    <img  src={item.stuGender==='male'?maleImg:femaleImg}  alt =''/>
                    {/* <p>{item.stuID}</p> */}
                    <p className={`name_card ${item.stuGender==='male'?"male_color":"female_color"}`}>{item.stuName}</p>
                    {
                      subjectList.map(e => {
                        const {key, value} = e
                        if(subjectChoose === key){
                          return  <p className='grade_card' key={key}>
                                      {value}：
                                      <span>{item[key]?item[key]:'--'}</span>
                                  </p>
                        }
                      })
                    }

                    <p className='pre_card'>
                      比上次：
                      {
                          <span 
                            className={item[subjectChoose] - item['pre_'+subjectChoose] >= 0? 'pos_num':'neg_num'}
                          >     {item[subjectChoose] - item['pre_'+subjectChoose]>=0? `+${item[subjectChoose] - item['pre_'+subjectChoose]}`:`-${item['pre_'+subjectChoose] - item[subjectChoose]}`}
                          </span>
                      }
                    </p>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <Modal 
          {...this.state}
          {...this.props}
          showModal={this.showModal}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
         />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      stuGrade: state.stuGrade,

    }
  },
  {
    getStudentGradeAsyn
  }
)(GradeAdd)
