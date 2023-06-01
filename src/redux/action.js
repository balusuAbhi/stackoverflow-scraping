export const GET_STACK_DATA = "GET_STACK_DATA"
export const SET_STACK_DATA = "SET_STACK_DATA"

export const getstackData = (stackData)=>{
    return{
        type:GET_STACK_DATA,
        payload:stackData
    }
}
export const setFiltiredData = ()=>{
    return{
        type:SET_STACK_DATA,
    }
}