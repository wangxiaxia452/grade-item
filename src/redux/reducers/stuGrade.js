export default function stuIGradeReducer(preState = [], action){
    const {type, data} = action
    switch(type){
        case 'STU_GRADE':
            return [...data]
        default:
            return preState
    }
}