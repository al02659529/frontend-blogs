const usernameReducer = (state='', action) => {
    switch (action.type){
    case 'SET_USERNAME':{
        return action.data
    }
    default: return state
    }
}

export const setUsername = data => {
    return { type: 'SET_USERNAME', data }
}

export default usernameReducer