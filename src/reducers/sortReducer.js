const sortReducer = (state='date', action) => {
    switch (action.type){
        case 'SET_SORT':{
            return action.data
        }
        default: return state
    }
}

export const setSort = data => {
    return { type: 'SET_SORT', data}
}

export default sortReducer