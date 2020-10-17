const submittedReducer = (state=false, action) => {
    switch (action.type){
        case 'SET_SUBMITTED':{
            return action.data
        }
        default: return state
    }
}

export const setSubmitted = data => {
    return { type: 'SET_SUBMITTED', data}
}

export default submittedReducer