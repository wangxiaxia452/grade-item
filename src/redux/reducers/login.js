const initState = {
    user: {}
}

export default function loginReducer(state=initState, action) {
   switch(action.type){
       case 'SETUSER':
         return {
             user: action.user
         }  
       default:
          return state 
   }
}