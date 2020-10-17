const successReducer = (state=null, action) => {
    switch (action.type){
        case 'SET_SUCCESS':{
            return action.data
        }
        default: return state
    }
}

export const setSuccess = data => {
    return { type: 'SET_SUCCESS', data}
}

export default successReducer