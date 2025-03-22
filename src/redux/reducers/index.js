import {combineReducers} from 'redux'
import login from './login'
import stuInfo from './stuInfo'
import stuGrade from './stuGrade'
import common from './common'

export default combineReducers({
    login,
    stuInfo,
    stuGrade,
    common
})