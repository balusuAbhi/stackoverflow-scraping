import { GET_STACK_DATA } from "./action"




const initialState = {
    StackData : [],

}
const reducer = (state= initialState,action) =>{
   switch(action.type) {
         case GET_STACK_DATA: return {
            ...state,
            StackData : action.payload
         }

         default :return state
   }
}

export default reducer