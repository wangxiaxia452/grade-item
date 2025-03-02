import request from '../utills/request'

export function addStuInfo(data) {
    return request({
        url:'/student',
        method:'post',
        data
    })
}

export function editStuInfo(data) {
    return request({
        url:'/student/edit',
        method:'post',
        data
    })
}

export function delStuInfo(data) {
    return request({
        url:'/student/del',
        method:'post',
        data
    })
}
 
export function getStuInfoList(data) {
    return request({
        url:'/student',
        method:'get',
        params: data
    })
}

export function addStuGrade(data){
    return request({
        url:'/grade',
        method:'post',
        data
    })
}

export function getStuGrades(data) {
    return request({
        url:'/grade',
        method: 'get',
        params: data
    })
}

export function getStuPreGrades(data) {
    return request({
        url:'/history',
        method: 'get',
        params: data
    })
}

export function register(data) {
    return request({
        url:'/register',
        method: 'post',
        data
    })
}

export function login(data) {
    return request({
        url:'/login',
        method: 'post',
        data
    })
}