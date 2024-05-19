import {getStuGrades} from '../../services/query'

export const getStudentGradeAsyn = (data) => {
    return (dispatch) => {
        getStuGrades(data).then(res => {
            const {data:{code, data: list}} = res
            if(code === '0000'){
                dispatch({
                    type: 'STU_GRADE',
                    data: list
                })
            }
        })
    }
}
