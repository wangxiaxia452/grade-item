
import {Navigate} from 'react-router-dom'
import StudentInfo from '../pages/StudentInfo'
import GradeAdd from '../pages/GradeAdd'
import GradesList from '../pages/GradesList'
import Auth from '../pages/Auth'
import Login from '../pages/Login'

export default [
    {
        path: '/sign',
        element: <Auth />
    },
    {
        path: '/login',
        element: <Login />
    },
    { 
        path: '/stuInfo',
        element: <StudentInfo />
    },
    {
        path: '/addGrade',
        element: <GradeAdd />
    },
    {
        path: '/allGrades',
        element:  <GradesList />
    },
    {
        path: '/',
        element: <Navigate to='/stuInfo'/>
    }
]