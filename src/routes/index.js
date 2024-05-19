
import {Navigate} from 'react-router-dom'
import StudentInfo from '../pages/StudentInfo'
import GradeAdd from '../pages/GradeAdd'
import GradesList from '../pages/GradesList'

export default [
    // {
    //     path: '/home'
    //     element: 
    // },
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
        element: <GradesList />  
    },
    {
        path: '/',
        element: <Navigate to='/stuInfo' />
    }
]