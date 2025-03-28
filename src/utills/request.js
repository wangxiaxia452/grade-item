import axios from 'axios'
import store from '../redux/store'
 
 
var request = axios.create({
    // 后台接口的基准地址
    // baseURL:"http://127.0.0.1:5000/",
    timeout:5000
})
 
// 添加请求拦截器
request.interceptors.request.use((config) => {
    // store.subscribe(() => {
       if(store.getState().login.user.token){
        // request.defaults.headers.common['Authorization'] = store.getState().login.user.token
        config.headers.Authorization = store.getState().login.user.token
       }
    // })

    return config
}, function (error) {
    //对相应错误做点什么
    return Promise.reject(error)
}
)
 
 
 
//拦截器响应
request.interceptors.response.use((response) => {
    return response
}, function (error) {
    //对相应错误做点什么
    return Promise.reject(error)
}
)
 
export default request