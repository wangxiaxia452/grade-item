
export default function loginReducer(state={}, action) {
   switch(action.type){
       case 'SAVE':
         return {
            ...action.info
         }  
       default:
          return state 
   }
}