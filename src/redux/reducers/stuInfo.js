export default function stuInfoReducer(preState = [], action){
    const {type, data} = action
    switch(type){
        case 'STU_INFO':
            return [...data]
        default:
            return preState
    }
}