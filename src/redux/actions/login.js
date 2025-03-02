import {login} from '../../services/query'

//redux存储token
export const setUser = (user) => {
    return {
        type: 'SETUSER',
        user
    }
}

export const loginAsync = (data) => {
   return (dispatch) => {
     return login(data).then(res => {
         const {data: {code, token, userNumber}} = res
         if(code === '0000') {
             //redux存储token
            dispatch(setUser({
                token,
                userNumber
            }))
            //存入到本地
            localStorage.setItem('save',JSON.stringify({
                token,
                userNumber
            }))
         }
         return res
     })
   }
}