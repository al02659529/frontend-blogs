const passwordReducer = (state='', action) => {
    switch (action.type){
        case 'SET_PASSWORD':{
            return action.data
        }
        default: return state
    }
}

export const setPassword = data => {
    return { type: 'SET_PASSWORD', data}
}

export default passwordReducer