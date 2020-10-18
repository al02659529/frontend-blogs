const pageReducer = (state='all', action) => {
    switch (action.type){
    case 'SET_PAGE':{
        return action.data
    }
    default: return state
    }
}

export const setPage = data => {
    return { type: 'SET_PAGE', data }
}

export default pageReducer