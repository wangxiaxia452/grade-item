import {getStuInfoList} from '../../services/query'

export const getStudentInfoAsyn = (data) => {
    return async (dispatch) => {
        getStuInfoList(data).then(res => {
            const {data:{code, data: list}} = res
            if(code === '0000'){
                dispatch({
                    type: 'STU_INFO',
                    data: list
                })
            }
        //     return new Promise()
        })
    }
}