import {combineReducers} from 'redux'
import login from './login'
import stuInfo from './stuInfo'
import stuGrade from './stuGrade'

export default combineReducers({
    login,
    stuInfo,
    stuGrade
})